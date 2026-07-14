/* src/transmisiones/transmisiones.service.ts: */
import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { EstadoActividad, EstadoTransmision } from '../generated/prisma/enums';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTransmisionDto } from './dto/create-transmision.dto';
import { UpdateTransmisionDto } from './dto/update-transmision.dto';

@Injectable()
export class TransmisionesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTransmisionDto: CreateTransmisionDto) {
    await this.verificarUsuario(createTransmisionDto.UsuarioFK);

    const transmisionActiva = await this.prisma.transmision.findFirst({
      where: {
        UsuarioFK: createTransmisionDto.UsuarioFK,
        estado: EstadoTransmision.LIVE,
      },
    });

    if (transmisionActiva) {
      throw new RpcException({
        statusCode: HttpStatus.CONFLICT,
        message: `El usuario con el ID ${createTransmisionDto.UsuarioFK} ya tiene una transmisión LIVE.`,
        error: 'Conflict',
      });
    }

    return this.prisma.$transaction(async (transaccion) => {
      await transaccion.usuario.update({
        where: {
          IdUsuario: createTransmisionDto.UsuarioFK,
        },
        data: {
          estadoActividad: EstadoActividad.ONLINE,
        },
      });

      return transaccion.transmision.create({
        data: createTransmisionDto,
        include: {
          usuario: true,
          donaciones: true,
        },
      });
    });
  }

  findAll() {
    return this.prisma.transmision.findMany({
      include: {
        usuario: true,
        donaciones: true,
      },
      orderBy: {
        fechaInicio: 'desc',
      },
    });
  }

  findLive() {
    return this.prisma.transmision.findMany({
      where: {
        estado: EstadoTransmision.LIVE,
      },
      include: {
        usuario: true,
        donaciones: true,
      },
      orderBy: {
        fechaInicio: 'desc',
      },
    });
  }

  async findByUsuario(idUsuario: number) {
    await this.verificarUsuario(idUsuario);

    return this.prisma.transmision.findMany({
      where: {
        UsuarioFK: idUsuario,
      },
      include: {
        usuario: true,
        donaciones: true,
      },
      orderBy: {
        fechaInicio: 'desc',
      },
    });
  }

  async findOne(id: number) {
    const transmision = await this.prisma.transmision.findUnique({
      where: {
        IdTransmision: id,
      },
      include: {
        usuario: true,
        donaciones: true,
      },
    });

    if (!transmision) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No existe una transmisión con el ID ${id}.`,
        error: 'Not Found',
      });
    }

    return transmision;
  }

  async update(id: number, updateTransmisionDto: UpdateTransmisionDto) {
    const transmisionActual = await this.findOne(id);

    if (transmisionActual.estado === EstadoTransmision.FINALIZADA) {
      if (updateTransmisionDto.estado === EstadoTransmision.LIVE) {
        throw new RpcException({
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Una transmisión finalizada no puede volver a estar LIVE.',
          error: 'Bad Request',
        });
      }

      throw new RpcException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'La transmisión ya se encuentra finalizada.',
        error: 'Bad Request',
      });
    }

    if (updateTransmisionDto.estado === EstadoTransmision.LIVE) {
      throw new RpcException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'La transmisión ya se encuentra LIVE.',
        error: 'Bad Request',
      });
    }

    return this.prisma.$transaction(async (transaccion) => {
      await transaccion.usuario.update({
        where: {
          IdUsuario: transmisionActual.UsuarioFK,
        },
        data: {
          estadoActividad: EstadoActividad.DESCONECTADO,
        },
      });

      return transaccion.transmision.update({
        where: {
          IdTransmision: id,
        },
        data: {
          estado: EstadoTransmision.FINALIZADA,
          fechaFin: new Date(),
        },
        include: {
          usuario: true,
          donaciones: true,
        },
      });
    });
  }

  async remove(id: number) {
    const transmision = await this.findOne(id);

    if (transmision.donaciones.length > 0) {
      throw new RpcException({
        statusCode: HttpStatus.CONFLICT,
        message:
          'No se puede eliminar la transmisión porque tiene donaciones asociadas.',
        error: 'Conflict',
      });
    }

    if (transmision.estado === EstadoTransmision.LIVE) {
      return this.prisma.$transaction(async (transaccion) => {
        await transaccion.usuario.update({
          where: {
            IdUsuario: transmision.UsuarioFK,
          },
          data: {
            estadoActividad: EstadoActividad.DESCONECTADO,
          },
        });

        return transaccion.transmision.delete({
          where: {
            IdTransmision: id,
          },
        });
      });
    }

    return this.prisma.transmision.delete({
      where: {
        IdTransmision: id,
      },
    });
  }

  private async verificarUsuario(idUsuario: number): Promise<void> {
    const usuario = await this.prisma.usuario.findUnique({
      where: {
        IdUsuario: idUsuario,
      },
      select: {
        IdUsuario: true,
      },
    });

    if (!usuario) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No existe un usuario con el ID ${idUsuario}.`,
        error: 'Not Found',
      });
    }
  }
}
