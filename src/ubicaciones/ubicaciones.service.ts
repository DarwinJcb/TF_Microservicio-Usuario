/* src/ubicaciones/ubicaciones.service.ts: */
import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUbicacionDto } from './dto/create-ubicacion.dto';
import { UpdateUbicacionMensajeDto } from './dto/update-ubicacion-mensaje.dto';

@Injectable()
export class UbicacionesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUbicacionDto: CreateUbicacionDto) {
    await this.verificarUsuario(createUbicacionDto.UsuarioFK);

    return this.prisma.ubicacion.create({
      data: createUbicacionDto,
    });
  }

  findAll() {
    return this.prisma.ubicacion.findMany();
  }

  async findByUsuario(IdUsuario: number) {
    await this.verificarUsuario(IdUsuario);

    return this.prisma.ubicacion.findMany({
      where: {
        UsuarioFK: IdUsuario,
      },
    });
  }

  async findOne(IdUbicacion: number) {
    const ubicacion = await this.prisma.ubicacion.findUnique({
      where: {
        IdUbicacion,
      },
    });

    if (!ubicacion) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No existe una ubicación con el ID ${IdUbicacion}.`,
        error: 'Not Found',
      });
    }

    return ubicacion;
  }

  async update(updateUbicacionDto: UpdateUbicacionMensajeDto) {
    const { IdUbicacion, ...datosUbicacion } = updateUbicacionDto;

    await this.findOne(IdUbicacion);

    if (datosUbicacion.UsuarioFK !== undefined) {
      await this.verificarUsuario(datosUbicacion.UsuarioFK);
    }

    return this.prisma.ubicacion.update({
      where: {
        IdUbicacion,
      },
      data: datosUbicacion,
    });
  }

  async remove(IdUbicacion: number) {
    await this.findOne(IdUbicacion);

    return this.prisma.ubicacion.delete({
      where: {
        IdUbicacion,
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
