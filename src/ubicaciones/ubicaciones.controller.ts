/* src/ubicaciones/ubicaciones.controller.ts: */
import { Controller } from '@nestjs/common';
import {
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { IdUsuarioDto } from '../usuarios/dto/id-usuario.dto';
import { CreateUbicacionDto } from './dto/create-ubicacion.dto';
import { IdUbicacionDto } from './dto/id-ubicacion.dto';
import { UpdateUbicacionMensajeDto } from './dto/update-ubicacion-mensaje.dto';
import { PATRONES_UBICACIONES } from './patrones/ubicaciones.patrones';
import { UbicacionesService } from './ubicaciones.service';

@Controller()
export class UbicacionesController {
  constructor(
    private readonly ubicacionesService: UbicacionesService,
  ) { }

  @MessagePattern(PATRONES_UBICACIONES.CREAR)
  create(
    @Payload() createUbicacionDto: CreateUbicacionDto,
  ) {
    return this.ubicacionesService.create(
      createUbicacionDto,
    );
  }

  @MessagePattern(PATRONES_UBICACIONES.LISTAR)
  findAll() {
    return this.ubicacionesService.findAll();
  }

  @MessagePattern(
    PATRONES_UBICACIONES.BUSCAR_POR_USUARIO,
  )
  findByUsuario(
    @Payload() idUsuarioDto: IdUsuarioDto,
  ) {
    return this.ubicacionesService.findByUsuario(
      idUsuarioDto.IdUsuario,
    );
  }

  @MessagePattern(PATRONES_UBICACIONES.BUSCAR)
  findOne(
    @Payload() idUbicacionDto: IdUbicacionDto,
  ) {
    return this.ubicacionesService.findOne(
      idUbicacionDto.IdUbicacion,
    );
  }

  @MessagePattern(PATRONES_UBICACIONES.ACTUALIZAR)
  update(
    @Payload()
    updateUbicacionDto: UpdateUbicacionMensajeDto,
  ) {
    return this.ubicacionesService.update(
      updateUbicacionDto,
    );
  }

  @MessagePattern(PATRONES_UBICACIONES.ELIMINAR)
  remove(
    @Payload() idUbicacionDto: IdUbicacionDto,
  ) {
    return this.ubicacionesService.remove(
      idUbicacionDto.IdUbicacion,
    );
  }
}