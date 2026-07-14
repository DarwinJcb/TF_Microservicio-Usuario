/* src/ubicaciones/ubicaciones.service.ts: */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaUsuariosService } from '../prisma-usuarios/prisma-usuarios.service';
import { CreateUbicacionDto } from './dto/create-ubicacion.dto';
import { UpdateUbicacionDto } from './dto/update-ubicacion.dto';

@Injectable()
export class UbicacionesService {
  constructor(private readonly prismaUsuarios: PrismaUsuariosService) {}

  async create(createUbicacionDto: CreateUbicacionDto) {
    await this.verificarUsuario(createUbicacionDto.UsuarioFK);

    return this.prismaUsuarios.ubicacion.create({
      data: createUbicacionDto,
    });
  }

  findAll() {
    return this.prismaUsuarios.ubicacion.findMany();
  }

  async findByUsuario(idUsuario: number) {
    await this.verificarUsuario(idUsuario);

    return this.prismaUsuarios.ubicacion.findMany({
      where: {
        UsuarioFK: idUsuario,
      },
    });
  }

  async findOne(id: number) {
    const ubicacion = await this.prismaUsuarios.ubicacion.findUnique({
      where: {
        IdUbicacion: id,
      },
    });

    if (!ubicacion) {
      throw new NotFoundException(`No existe una ubicación con el ID ${id}.`);
    }

    return ubicacion;
  }

  async update(id: number, updateUbicacionDto: UpdateUbicacionDto) {
    await this.findOne(id);

    if (updateUbicacionDto.UsuarioFK !== undefined) {
      await this.verificarUsuario(updateUbicacionDto.UsuarioFK);
    }

    return this.prismaUsuarios.ubicacion.update({
      where: {
        IdUbicacion: id,
      },
      data: updateUbicacionDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prismaUsuarios.ubicacion.delete({
      where: {
        IdUbicacion: id,
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
