/* src/fotos/fotos.service.ts: */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaUsuariosService } from '../prisma-usuarios/prisma-usuarios.service';
import { CreateFotoDto } from './dto/create-foto.dto';
import { UpdateFotoDto } from './dto/update-foto.dto';

@Injectable()
export class FotosService {
  constructor(private readonly prismaUsuarios: PrismaUsuariosService) {}

  async create(createFotoDto: CreateFotoDto) {
    await this.verificarUsuario(createFotoDto.UsuarioFK);

    return this.prismaUsuarios.foto.create({
      data: createFotoDto,
    });
  }

  findAll() {
    return this.prismaUsuarios.foto.findMany();
  }

  async findByUsuario(idUsuario: number) {
    await this.verificarUsuario(idUsuario);

    return this.prismaUsuarios.foto.findMany({
      where: {
        UsuarioFK: idUsuario,
      },
    });
  }

  async findOne(id: number) {
    const foto = await this.prismaUsuarios.foto.findUnique({
      where: {
        IdFoto: id,
      },
    });

    if (!foto) {
      throw new NotFoundException(`No existe una foto con el ID ${id}.`);
    }

    return foto;
  }

  async update(id: number, updateFotoDto: UpdateFotoDto) {
    await this.findOne(id);

    if (updateFotoDto.UsuarioFK !== undefined) {
      await this.verificarUsuario(updateFotoDto.UsuarioFK);
    }

    return this.prismaUsuarios.foto.update({
      where: {
        IdFoto: id,
      },
      data: updateFotoDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prismaUsuarios.foto.delete({
      where: {
        IdFoto: id,
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
