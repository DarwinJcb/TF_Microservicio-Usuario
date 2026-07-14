/* tf_microservicio-usuarios/src/musicas/musicas.controller.ts */
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateMusicaDto } from './dto/create-musica.dto';
import {
  ActualizarMusicaPayloadDto,
  IdMusicaPayloadDto,
  IdUsuarioMusicasPayloadDto,
} from './dto/musicas-payload.dto';
import { MUSICAS_PATTERNS } from './musicas.patterns';
import { MusicasService } from './musicas.service';

@Controller()
export class MusicasController {
  constructor(private readonly musicasService: MusicasService) {}

  @MessagePattern(MUSICAS_PATTERNS.CREAR)
  create(@Payload() createMusicaDto: CreateMusicaDto) {
    return this.musicasService.create(createMusicaDto);
  }

  @MessagePattern(MUSICAS_PATTERNS.LISTAR)
  findAll() {
    return this.musicasService.findAll();
  }

  @MessagePattern(MUSICAS_PATTERNS.LISTAR_POR_USUARIO)
  findByUsuario(@Payload() idUsuarioPayloadDto: IdUsuarioMusicasPayloadDto) {
    return this.musicasService.findByUsuario(idUsuarioPayloadDto.IdUsuario);
  }

  @MessagePattern(MUSICAS_PATTERNS.BUSCAR_POR_ID)
  findOne(@Payload() idMusicaPayloadDto: IdMusicaPayloadDto) {
    return this.musicasService.findOne(idMusicaPayloadDto.IdMusica);
  }

  @MessagePattern(MUSICAS_PATTERNS.ACTUALIZAR)
  update(
    @Payload()
    actualizarMusicaPayloadDto: ActualizarMusicaPayloadDto,
  ) {
    return this.musicasService.update(
      actualizarMusicaPayloadDto.IdMusica,
      actualizarMusicaPayloadDto.datosMusica,
    );
  }

  @MessagePattern(MUSICAS_PATTERNS.ELIMINAR)
  remove(@Payload() idMusicaPayloadDto: IdMusicaPayloadDto) {
    return this.musicasService.remove(idMusicaPayloadDto.IdMusica);
  }
}
