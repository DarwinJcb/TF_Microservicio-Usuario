/* src/musicas/musicas.service.ts: */
import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMusicaDto } from './dto/create-musica.dto';
import { UpdateMusicaMensajeDto } from './dto/update-musica-mensaje.dto';

@Injectable()
export class MusicasService {
  constructor(private readonly prisma: PrismaService) { }

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

  async findByUsuario(IdUsuario: number) {
    await this.verificarUsuario(IdUsuario);

    return this.prisma.musica.findMany({
      where: {
        UsuarioFK: IdUsuario,
      },
    });
  }

  async findOne(IdMusica: number) {
    const musica = await this.prisma.musica.findUnique({
      where: {
        IdMusica,
      },
    });

    if (!musica) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message = await this.prisma.musica.findUnique({
          where: {
            IdMusica,
          },
        });

        if(!musica) {
     : `No existe un registro musical con el ID ${IdMusica}.`,
            error: 'Not Found',
      });
    }

    return musica;
  }

  async update(
    updateMusicaDto: UpdateMusicaMensajeDto,
  ) {
    const { IdMusica, ...datosMusica } =
      updateMusicaDto;

    const musicaActual = await this.findOne(IdMusica);

    if (datosMusica.UsuarioFK !== undefined) {
      await this.verificarUsuario(
        datosMusica.UsuarioFK,
      );
    }

    const nombreCancion =
      datosMusica.nombreCancion !== undefined
        ? datosMusica.nombreCancion
        : musicaActual.nombreCancion;

    const tipoMusica =
      datosMusica.tipoMusica !== undefined
        ? datosMusica.tipoMusica
        : musicaActual.tipoMusica;

    this.verificarContenidoMusical(
      nombreCancion,
      tipoMusica,
    );

    return this.prisma.musica.update({
      where: {
        IdMusica,
      },
      data: datosMusica,
    });
  }

  async remove(IdMusica: number) {
    await this.findOne(IdMusica);

    return this.prisma.musica.delete({
      where: {
        IdMusica,
      },
    });
  }

  private async verificarUsuario(
    IdUsuario: number,
  ): Promise<void> {
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

  private verificarContenidoMusical(
    nombreCancion?: string | null,
    tipoMusica?: string | null,
  ): void {
    const tieneCancion = Boolean(
      nombreCancion?.trim(),
    );

    const tieneTipoMusica = Boolean(
      tipoMusica?.trim(),
    );

    if (!tieneCancion && !tieneTipoMusica) {
      throw new RpcException({
        statusCode: HttpStatus.BAD_REQUEST,
        message:
          'Debe ingresar el nombre de una canción o un tipo de música.',
        error: 'Bad Request',
      });
    }
  }
}