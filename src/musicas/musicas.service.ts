/* src/musicas/musicas.service.ts: */
import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMusicaDto } from './dto/create-musica.dto';
import { UpdateMusicaDto } from './dto/update-musica.dto';

@Injectable()
export class MusicasService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMusicaDto: CreateMusicaDto) {
    await this.verificarUsuario(createMusicaDto.UsuarioFK);

    this.verificarContenidoMusical(
      createMusicaDto.nombreCancion,
      createMusicaDto.tipoMusica,
    );

    return this.prisma.musica.create({
      data: createMusicaDto,
    });
  }

  findAll() {
    return this.prisma.musica.findMany();
  }

  async findByUsuario(idUsuario: number) {
    await this.verificarUsuario(idUsuario);

    return this.prisma.musica.findMany({
      where: {
        UsuarioFK: idUsuario,
      },
    });
  }

  async findOne(id: number) {
    const musica = await this.prisma.musica.findUnique({
      where: {
        IdMusica: id,
      },
    });

    if (!musica) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No existe un registro musical con el ID ${id}.`,
        error: 'Not Found',
      });
    }

    return musica;
  }

  async update(id: number, updateMusicaDto: UpdateMusicaDto) {
    const musicaActual = await this.findOne(id);

    if (updateMusicaDto.UsuarioFK !== undefined) {
      await this.verificarUsuario(updateMusicaDto.UsuarioFK);
    }

    const nombreCancion =
      updateMusicaDto.nombreCancion !== undefined
        ? updateMusicaDto.nombreCancion
        : musicaActual.nombreCancion;

    const tipoMusica =
      updateMusicaDto.tipoMusica !== undefined
        ? updateMusicaDto.tipoMusica
        : musicaActual.tipoMusica;

    this.verificarContenidoMusical(nombreCancion, tipoMusica);

    return this.prisma.musica.update({
      where: {
        IdMusica: id,
      },
      data: updateMusicaDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.musica.delete({
      where: {
        IdMusica: id,
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

  private verificarContenidoMusical(
    nombreCancion?: string | null,
    tipoMusica?: string | null,
  ): void {
    const tieneCancion = Boolean(nombreCancion?.trim());
    const tieneTipoMusica = Boolean(tipoMusica?.trim());

    if (!tieneCancion && !tieneTipoMusica) {
      throw new RpcException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Debe ingresar el nombre de una canción o un tipo de música.',
        error: 'Bad Request',
      });
    }
  }
}
