/* src/fotos/fotos.controller.ts: */
import { Controller } from '@nestjs/common';
import {
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { IdUsuarioDto } from '../usuarios/dto/id-usuario.dto';
import { CreateFotoDto } from './dto/create-foto.dto';
import { IdFotoDto } from './dto/id-foto.dto';
import { UpdateFotoMensajeDto } from './dto/update-foto-mensaje.dto';
import { FotosService } from './fotos.service';
import { PATRONES_FOTOS } from './patrones/fotos.patrones';

@Controller()
export class FotosController {
  constructor(private readonly fotosService: FotosService) { }

  @MessagePattern(PATRONES_FOTOS.CREAR)
  create(@Payload() createFotoDto: CreateFotoDto) {
    return this.fotosService.create(createFotoDto);
  }

  @MessagePattern(PATRONES_FOTOS.LISTAR)
  findAll() {
    return this.fotosService.findAll();
  }

  @MessagePattern(PATRONES_FOTOS.BUSCAR_POR_USUARIO)
  findByUsuario(
    @Payload() idUsuarioDto: IdUsuarioDto,
  ) {
    return this.fotosService.findByUsuario(
      idUsuarioDto.IdUsuario,
    );
  }

  @MessagePattern(PATRONES_FOTOS.BUSCAR)
  findOne(@Payload() idFotoDto: IdFotoDto) {
    return this.fotosService.findOne(
      idFotoDto.IdFoto,
    );
  }

  @MessagePattern(PATRONES_FOTOS.ACTUALIZAR)
  update(
    @Payload() updateFotoDto: UpdateFotoMensajeDto,
  ) {
    return this.fotosService.update(updateFotoDto);
  }

  @MessagePattern(PATRONES_FOTOS.ELIMINAR)
  remove(@Payload() idFotoDto: IdFotoDto) {
    return this.fotosService.remove(
      idFotoDto.IdFoto,
    );
  }
}