/* src/transmisiones/transmisiones.service.ts: */
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  EstadoActividad,
  EstadoTransmision,
} from '../generated/prisma-usuarios/enums';
import { PrismaUsuariosService } from '../prisma-usuarios/prisma-usuarios.service';
import { CreateTransmisionDto } from './dto/create-transmision.dto';
import { UpdateTransmisionDto } from './dto/update-transmision.dto';

@Injectable()
export class TransmisionesService {
  constructor(private readonly prismaUsuarios: PrismaUsuariosService) {}

  async create(createTransmisionDto: CreateTransmisionDto) {
    await this.verificarUsuario(createTransmisionDto.UsuarioFK);

    const transmisionActiva = await this.prismaUsuarios.transmision.findFirst({
      where: {
        UsuarioFK: createTransmisionDto.UsuarioFK,
        estado: EstadoTransmision.LIVE,
      },
    });

    if (transmisionActiva) {
      throw new ConflictException(
        `El usuario con el ID ${createTransmisionDto.UsuarioFK} ya tiene una transmisión LIVE.`,
      );
    }

    return this.prismaUsuarios.$transaction(async (transaccion) => {
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
    return this.prismaUsuarios.transmision.findMany({
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
    return this.prismaUsuarios.transmision.findMany({
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

    return this.prismaUsuarios.transmision.findMany({
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
    const transmision = await this.prismaUsuarios.transmision.findUnique({
      where: {
        IdTransmision: id,
      },
      include: {
        usuario: true,
        donaciones: true,
      },
    });

    if (!transmision) {
      throw new NotFoundException(`No existe una transmisión con el ID ${id}.`);
    }

    return transmision;
  }

  async update(id: number, updateTransmisionDto: UpdateTransmisionDto) {
    const transmisionActual = await this.findOne(id);

    if (transmisionActual.estado === EstadoTransmision.FINALIZADA) {
      if (updateTransmisionDto.estado === EstadoTransmision.LIVE) {
        throw new BadRequestException(
          'Una transmisión finalizada no puede volver a estar LIVE.',
        );
      }

      throw new BadRequestException(
        'La transmisión ya se encuentra finalizada.',
      );
    }

    if (updateTransmisionDto.estado === EstadoTransmision.LIVE) {
      throw new BadRequestException('La transmisión ya se encuentra LIVE.');
    }

    return this.prismaUsuarios.$transaction(async (transaccion) => {
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
      throw new ConflictException(
        'No se puede eliminar la transmisión porque tiene donaciones asociadas.',
      );
    }

    if (transmision.estado === EstadoTransmision.LIVE) {
      return this.prismaUsuarios.$transaction(async (transaccion) => {
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

    return this.prismaUsuarios.transmision.delete({
      where: {
        IdTransmision: id,
      },
    });
  }

  private async verificarUsuario(idUsuario: number): Promise<void> {
    const usuario = await this.prismaUsuarios.usuario.findUnique({
      where: {
        IdUsuario: idUsuario,
      },
      select: {
        IdUsuario: true,
      },
    });

    if (!usuario) {
      throw new NotFoundException(
        `No existe un usuario con el ID ${idUsuario}.`,
      );
    }
  }
}
