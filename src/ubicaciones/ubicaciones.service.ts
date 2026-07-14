/* tf_microservicio-usuarios/src/ubicaciones/ubicaciones.service.ts */
import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUbicacionDto } from './dto/create-ubicacion.dto';
import { UpdateUbicacionDto } from './dto/update-ubicacion.dto';

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

  async findByUsuario(idUsuario: number) {
    await this.verificarUsuario(idUsuario);

    return this.prisma.ubicacion.findMany({
      where: {
        UsuarioFK: idUsuario,
      },
    });
  }

  async findOne(id: number) {
    const ubicacion = await this.prisma.ubicacion.findUnique({
      where: {
        IdUbicacion: id,
      },
    });

    if (!ubicacion) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No existe una ubicación con el ID ${id}.`,
        error: 'Not Found',
      });
    }

    return ubicacion;
  }

  async update(id: number, updateUbicacionDto: UpdateUbicacionDto) {
    await this.findOne(id);

    if (updateUbicacionDto.UsuarioFK !== undefined) {
      await this.verificarUsuario(updateUbicacionDto.UsuarioFK);
    }

    return this.prisma.ubicacion.update({
      where: {
        IdUbicacion: id,
      },
      data: updateUbicacionDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.ubicacion.delete({
      where: {
        IdUbicacion: id,
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
