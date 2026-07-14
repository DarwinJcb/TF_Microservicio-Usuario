/* src/ubicaciones/ubicaciones.controller.ts: */
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUbicacionDto } from './dto/create-ubicacion.dto';
import {
  ActualizarUbicacionPayloadDto,
  IdUbicacionPayloadDto,
  IdUsuarioUbicacionesPayloadDto,
} from './dto/ubicaciones-payload.dto';
import { UBICACIONES_PATTERNS } from './ubicaciones.patterns';
import { UbicacionesService } from './ubicaciones.service';

@Controller()
export class UbicacionesController {
  constructor(private readonly ubicacionesService: UbicacionesService) {}

  @MessagePattern(UBICACIONES_PATTERNS.CREAR)
  create(@Payload() createUbicacionDto: CreateUbicacionDto) {
    return this.ubicacionesService.create(createUbicacionDto);
  }

  @MessagePattern(UBICACIONES_PATTERNS.LISTAR)
  findAll() {
    return this.ubicacionesService.findAll();
  }

  @MessagePattern(UBICACIONES_PATTERNS.LISTAR_POR_USUARIO)
  findByUsuario(
    @Payload()
    idUsuarioPayloadDto: IdUsuarioUbicacionesPayloadDto,
  ) {
    return this.ubicacionesService.findByUsuario(idUsuarioPayloadDto.IdUsuario);
  }

  @MessagePattern(UBICACIONES_PATTERNS.BUSCAR_POR_ID)
  findOne(@Payload() idUbicacionPayloadDto: IdUbicacionPayloadDto) {
    return this.ubicacionesService.findOne(idUbicacionPayloadDto.IdUbicacion);
  }

  @MessagePattern(UBICACIONES_PATTERNS.ACTUALIZAR)
  update(
    @Payload()
    actualizarUbicacionPayloadDto: ActualizarUbicacionPayloadDto,
  ) {
    return this.ubicacionesService.update(
      actualizarUbicacionPayloadDto.IdUbicacion,
      actualizarUbicacionPayloadDto.datosUbicacion,
    );
  }

  @MessagePattern(UBICACIONES_PATTERNS.ELIMINAR)
  remove(@Payload() idUbicacionPayloadDto: IdUbicacionPayloadDto) {
    return this.ubicacionesService.remove(idUbicacionPayloadDto.IdUbicacion);
  }
}
