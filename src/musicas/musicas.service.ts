/* src/musicas/musicas.service.ts: */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaUsuariosService } from '../prisma-usuarios/prisma-usuarios.service';
import { CreateMusicaDto } from './dto/create-musica.dto';
import { UpdateMusicaDto } from './dto/update-musica.dto';

@Injectable()
export class MusicasService {
  constructor(private readonly prismaUsuarios: PrismaUsuariosService) {}

  async create(createMusicaDto: CreateMusicaDto) {
    await this.verificarUsuario(createMusicaDto.UsuarioFK);

    this.verificarContenidoMusical(
      createMusicaDto.nombreCancion,
      createMusicaDto.tipoMusica,
    );

    return this.prismaUsuarios.musica.create({
      data: createMusicaDto,
    });
  }

  findAll() {
    return this.prismaUsuarios.musica.findMany();
  }

  async findByUsuario(idUsuario: number) {
    await this.verificarUsuario(idUsuario);

    return this.prismaUsuarios.musica.findMany({
      where: {
        UsuarioFK: idUsuario,
      },
    });
  }

  async findOne(id: number) {
    const musica = await this.prismaUsuarios.musica.findUnique({
      where: {
        IdMusica: id,
      },
    });

    if (!musica) {
      throw new NotFoundException(
        `No existe un registro musical con el ID ${id}.`,
      );
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

    return this.prismaUsuarios.musica.update({
      where: {
        IdMusica: id,
      },
      data: updateMusicaDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prismaUsuarios.musica.delete({
      where: {
        IdMusica: id,
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

  private verificarContenidoMusical(
    nombreCancion?: string | null,
    tipoMusica?: string | null,
  ): void {
    const tieneCancion = Boolean(nombreCancion?.trim());
    const tieneTipoMusica = Boolean(tipoMusica?.trim());

    if (!tieneCancion && !tieneTipoMusica) {
      throw new BadRequestException(
        'Debe ingresar el nombre de una canción o un tipo de música.',
      );
    }
  }
}
