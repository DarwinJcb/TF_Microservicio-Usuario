/* src/musicas/musicas.controller.ts: */
import { Controller } from '@nestjs/common';
import {
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { IdUsuarioDto } from '../usuarios/dto/id-usuario.dto';
import { CreateMusicaDto } from './dto/create-musica.dto';
import { IdMusicaDto } from './dto/id-musica.dto';
import { UpdateMusicaMensajeDto } from './dto/update-musica-mensaje.dto';
import { MusicasService } from './musicas.service';
import { PATRONES_MUSICAS } from './patrones/musicas.patrones';

@Controller()
export class MusicasController {
  constructor(
    private readonly musicasService: MusicasService,
  ) { }

  @MessagePattern(PATRONES_MUSICAS.CREAR)
  create(
    @Payload() createMusicaDto: CreateMusicaDto,
  ) {
    return this.musicasService.create(
      createMusicaDto,
    );
  }

  @MessagePattern(PATRONES_MUSICAS.LISTAR)
  findAll() {
    return this.musicasService.findAll();
  }

  @MessagePattern(
    PATRONES_MUSICAS.BUSCAR_POR_USUARIO,
  )
  findByUsuario(
    @Payload() idUsuarioDto: IdUsuarioDto,
  ) {
    return this.musicasService.findByUsuario(
      idUsuarioDto.IdUsuario,
    );
  }

  @MessagePattern(PATRONES_MUSICAS.BUSCAR)
  findOne(
    @Payload() idMusicaDto: IdMusicaDto,
  ) {
    return this.musicasService.findOne(
      idMusicaDto.IdMusica,
    );
  }

  @MessagePattern(PATRONES_MUSICAS.ACTUALIZAR)
  update(
    @Payload()
    updateMusicaDto: UpdateMusicaMensajeDto,
  ) {
    return this.musicasService.update(
      updateMusicaDto,
    );
  }

  @MessagePattern(PATRONES_MUSICAS.ELIMINAR)
  remove(
    @Payload() idMusicaDto: IdMusicaDto,
  ) {
    return this.musicasService.remove(
      idMusicaDto.IdMusica,
    );
  }
}