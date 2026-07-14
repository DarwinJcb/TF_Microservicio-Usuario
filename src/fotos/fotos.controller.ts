/* src/fotos/fotos.controller.ts: */
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateFotoDto } from './dto/create-foto.dto';
import {
  ActualizarFotoPayloadDto,
  IdFotoPayloadDto,
  IdUsuarioFotosPayloadDto,
} from './dto/fotos-payload.dto';
import { FOTOS_PATTERNS } from './fotos.patterns';
import { FotosService } from './fotos.service';

@Controller()
export class FotosController {
  constructor(private readonly fotosService: FotosService) {}

  @MessagePattern(FOTOS_PATTERNS.CREAR)
  create(@Payload() createFotoDto: CreateFotoDto) {
    return this.fotosService.create(createFotoDto);
  }

  @MessagePattern(FOTOS_PATTERNS.LISTAR)
  findAll() {
    return this.fotosService.findAll();
  }

  @MessagePattern(FOTOS_PATTERNS.LISTAR_POR_USUARIO)
  findByUsuario(@Payload() idUsuarioPayloadDto: IdUsuarioFotosPayloadDto) {
    return this.fotosService.findByUsuario(idUsuarioPayloadDto.IdUsuario);
  }

  @MessagePattern(FOTOS_PATTERNS.BUSCAR_POR_ID)
  findOne(@Payload() idFotoPayloadDto: IdFotoPayloadDto) {
    return this.fotosService.findOne(idFotoPayloadDto.IdFoto);
  }

  @MessagePattern(FOTOS_PATTERNS.ACTUALIZAR)
  update(@Payload() actualizarFotoPayloadDto: ActualizarFotoPayloadDto) {
    return this.fotosService.update(
      actualizarFotoPayloadDto.IdFoto,
      actualizarFotoPayloadDto.datosFoto,
    );
  }

  @MessagePattern(FOTOS_PATTERNS.ELIMINAR)
  remove(@Payload() idFotoPayloadDto: IdFotoPayloadDto) {
    return this.fotosService.remove(idFotoPayloadDto.IdFoto);
  }
}
