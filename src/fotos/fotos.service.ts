/* src/fotos/fotos.service.ts: */
import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFotoDto } from './dto/create-foto.dto';
import { UpdateFotoMensajeDto } from './dto/update-foto-mensaje.dto';

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

  async findByUsuario(IdUsuario: number) {
    await this.verificarUsuario(IdUsuario);

    return this.prisma.foto.findMany({
      where: {
        UsuarioFK: IdUsuario,
      },
    });
  }

  async findOne(IdFoto: number) {
    const foto = await this.prisma.foto.findUnique({
      where: {
        IdFoto,
      },
    });

    if (!foto) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No existe una foto con el ID ${IdFoto}.`,
        error: 'Not Found',
      });
    }

    return foto;
  }

  async update(updateFotoDto: UpdateFotoMensajeDto) {
    const { IdFoto, ...datosFoto } = updateFotoDto;

    await this.findOne(IdFoto);

    if (datosFoto.UsuarioFK !== undefined) {
      await this.verificarUsuario(datosFoto.UsuarioFK);
    }

    return this.prisma.foto.update({
      where: {
        IdFoto,
      },
      data: datosFoto,
    });
  }

  async remove(IdFoto: number) {
    await this.findOne(IdFoto);

    return this.prisma.foto.delete({
      where: {
        IdFoto,
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
