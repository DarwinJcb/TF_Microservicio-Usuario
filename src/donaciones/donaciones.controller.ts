/* tf_microservicio-usuarios/src/donaciones/donaciones.controller.ts */
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { DonacionesService } from './donaciones.service';
import { CreateDonacionDto } from './dto/create-donacion.dto';
import {
  ActualizarDonacionPayloadDto,
  IdDonacionPayloadDto,
  IdTransmisionDonacionesPayloadDto,
  IdUsuarioDonacionesPayloadDto,
} from './dto/donaciones-payload.dto';
import { DONACIONES_PATTERNS } from './donaciones.patterns';

@Controller()
export class DonacionesController {
  constructor(private readonly donacionesService: DonacionesService) {}

  @MessagePattern(DONACIONES_PATTERNS.CREAR)
  create(@Payload() createDonacionDto: CreateDonacionDto) {
    return this.donacionesService.create(createDonacionDto);
  }

  @MessagePattern(DONACIONES_PATTERNS.LISTAR)
  findAll() {
    return this.donacionesService.findAll();
  }

  @MessagePattern(DONACIONES_PATTERNS.LISTAR_POR_DONANTE)
  findByDonante(
    @Payload()
    idUsuarioPayloadDto: IdUsuarioDonacionesPayloadDto,
  ) {
    return this.donacionesService.findByDonante(idUsuarioPayloadDto.IdUsuario);
  }

  @MessagePattern(DONACIONES_PATTERNS.LISTAR_POR_RECEPTOR)
  findByReceptor(
    @Payload()
    idUsuarioPayloadDto: IdUsuarioDonacionesPayloadDto,
  ) {
    return this.donacionesService.findByReceptor(idUsuarioPayloadDto.IdUsuario);
  }

  @MessagePattern(DONACIONES_PATTERNS.LISTAR_POR_TRANSMISION)
  findByTransmision(
    @Payload()
    idTransmisionPayloadDto: IdTransmisionDonacionesPayloadDto,
  ) {
    return this.donacionesService.findByTransmision(
      idTransmisionPayloadDto.IdTransmision,
    );
  }

  @MessagePattern(DONACIONES_PATTERNS.BUSCAR_POR_ID)
  findOne(@Payload() idDonacionPayloadDto: IdDonacionPayloadDto) {
    return this.donacionesService.findOne(idDonacionPayloadDto.IdDonacion);
  }

  @MessagePattern(DONACIONES_PATTERNS.ACTUALIZAR)
  update(
    @Payload()
    actualizarDonacionPayloadDto: ActualizarDonacionPayloadDto,
  ) {
    return this.donacionesService.update(
      actualizarDonacionPayloadDto.IdDonacion,
      actualizarDonacionPayloadDto.datosDonacion,
    );
  }

  @MessagePattern(DONACIONES_PATTERNS.ELIMINAR)
  remove(@Payload() idDonacionPayloadDto: IdDonacionPayloadDto) {
    return this.donacionesService.remove(idDonacionPayloadDto.IdDonacion);
  }
}
