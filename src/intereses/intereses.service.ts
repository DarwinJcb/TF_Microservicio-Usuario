/* src/intereses/intereses.service.ts: */
import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInteresDto } from './dto/create-interes.dto';
import { UpdateInteresMensajeDto } from './dto/update-interes-mensaje.dto';

@Injectable()
export class InteresesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createInteresDto: CreateInteresDto) {
    await this.verificarUsuario(createInteresDto.UsuarioFK);

    const interesExistente = await this.prisma.interes.findUnique({
      where: {
        UsuarioFK: createInteresDto.UsuarioFK,
      },
      select: {
        IdInteres: true,
      },
    });

    if (interesExistente) {
      throw new RpcException({
        statusCode: HttpStatus.CONFLICT,
        message: `El usuario con el ID ${createInteresDto.UsuarioFK} ya tiene intereses registrados.`,
        error: 'Conflict',
      });
    }

    return this.prisma.interes.create({
      data: createInteresDto,
    });
  }

  findAll() {
    return this.prisma.interes.findMany();
  }

  async findByUsuario(IdUsuario: number) {
    await this.verificarUsuario(IdUsuario);

    const interes = await this.prisma.interes.findUnique({
      where: {
        UsuarioFK: IdUsuario,
      },
    });

    if (!interes) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `El usuario con el ID ${IdUsuario} no tiene intereses registrados.`,
        error: 'Not Found',
      });
    }

    return interes;
  }

  async findOne(IdInteres: number) {
    const interes = await this.prisma.interes.findUnique({
      where: {
        IdInteres,
      },
    });

    if (!interes) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No existe un interés con el ID ${IdInteres}.`,
        error: 'Not Found',
      });
    }

    return interes;
  }

  async update(updateInteresDto: UpdateInteresMensajeDto) {
    const { IdInteres, ...datosInteres } = updateInteresDto;

    await this.findOne(IdInteres);

    if (datosInteres.UsuarioFK !== undefined) {
      await this.verificarUsuario(datosInteres.UsuarioFK);

      const interesDelUsuario = await this.prisma.interes.findUnique({
        where: {
          UsuarioFK: datosInteres.UsuarioFK,
        },
        select: {
          IdInteres: true,
        },
      });

      if (interesDelUsuario && interesDelUsuario.IdInteres !== IdInteres) {
        throw new RpcException({
          statusCode: HttpStatus.CONFLICT,
          message: `El usuario con el ID ${datosInteres.UsuarioFK} ya tiene intereses registrados.`,
          error: 'Conflict',
        });
      }
    }

    return this.prisma.interes.update({
      where: {
        IdInteres,
      },
      data: datosInteres,
    });
  }

  async remove(IdInteres: number) {
    await this.findOne(IdInteres);

    return this.prisma.interes.delete({
      where: {
        IdInteres,
      },
    });
  }

  private async verificarUsuario(IdUsuario: number): Promise<void> {
    const usuario = await this.prisma.usuario.findUnique({
      where: {
        IdUsuario,
      },
      select: {
        IdUsuario: true,
      },
    });

    if (!usuario) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No existe un usuario con el ID ${IdUsuario}.`,
        error: 'Not Found',
      });
    }
  }
}
