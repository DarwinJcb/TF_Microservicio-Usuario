/* src/fotos/fotos.service.ts: */
import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFotoDto } from './dto/create-foto.dto';
import { UpdateFotoDto } from './dto/update-foto.dto';

@Injectable()
export class FotosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createFotoDto: CreateFotoDto) {
    await this.verificarUsuario(createFotoDto.UsuarioFK);

    return this.prisma.foto.create({
      data: createFotoDto,
    });
  }

  findAll() {
    return this.prisma.foto.findMany();
  }

  async findByUsuario(idUsuario: number) {
    await this.verificarUsuario(idUsuario);

    return this.prisma.foto.findMany({
      where: {
        UsuarioFK: idUsuario,
      },
    });
  }

  async findOne(id: number) {
    const foto = await this.prisma.foto.findUnique({
      where: {
        IdFoto: id,
      },
    });

    if (!foto) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No existe una foto con el ID ${id}.`,
        error: 'Not Found',
      });
    }

    return foto;
  }

  async update(id: number, updateFotoDto: UpdateFotoDto) {
    await this.findOne(id);

    if (updateFotoDto.UsuarioFK !== undefined) {
      await this.verificarUsuario(updateFotoDto.UsuarioFK);
    }

    return this.prisma.foto.update({
      where: {
        IdFoto: id,
      },
      data: updateFotoDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.foto.delete({
      where: {
        IdFoto: id,
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
