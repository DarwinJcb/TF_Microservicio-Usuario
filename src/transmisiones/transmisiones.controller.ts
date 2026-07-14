/* src/transmisiones/transmisiones.controller.ts: */
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateTransmisionDto } from './dto/create-transmision.dto';
import {
  ActualizarTransmisionPayloadDto,
  IdTransmisionPayloadDto,
  IdUsuarioTransmisionesPayloadDto,
} from './dto/transmisiones-payload.dto';
import { TRANSMISIONES_PATTERNS } from './transmisiones.patterns';
import { TransmisionesService } from './transmisiones.service';

@Controller()
export class TransmisionesController {
  constructor(
    private readonly transmisionesService: TransmisionesService,
  ) { }

  @MessagePattern(TRANSMISIONES_PATTERNS.CREAR)
  create(@Payload() createTransmisionDto: CreateTransmisionDto) {
    return this.transmisionesService.create(createTransmisionDto);
  }

  @MessagePattern(TRANSMISIONES_PATTERNS.LISTAR)
  findAll() {
    return this.transmisionesService.findAll();
  }

  @MessagePattern(TRANSMISIONES_PATTERNS.LISTAR_LIVE)
  findLive() {
    return this.transmisionesService.findLive();
  }

  @MessagePattern(TRANSMISIONES_PATTERNS.LISTAR_POR_USUARIO)
  findByUsuario(
    @Payload()
    idUsuarioPayloadDto: IdUsuarioTransmisionesPayloadDto,
  ) {
    return this.transmisionesService.findByUsuario(
      idUsuarioPayloadDto.IdUsuario,
    );
  }

  @MessagePattern(TRANSMISIONES_PATTERNS.BUSCAR_POR_ID)
  findOne(
    @Payload() idTransmisionPayloadDto: IdTransmisionPayloadDto,
  ) {
    return this.transmisionesService.findOne(
      idTransmisionPayloadDto.IdTransmision,
    );
  }

  @MessagePattern(TRANSMISIONES_PATTERNS.ACTUALIZAR)
  update(
    @Payload()
    actualizarTransmisionPayloadDto: ActualizarTransmisionPayloadDto,
  ) {
    return this.transmisionesService.update(
      actualizarTransmisionPayloadDto.IdTransmision,
      actualizarTransmisionPayloadDto.datosTransmision,
    );
  }

  @MessagePattern(TRANSMISIONES_PATTERNS.ELIMINAR)
  remove(
    @Payload() idTransmisionPayloadDto: IdTransmisionPayloadDto,
  ) {
    return this.transmisionesService.remove(
      idTransmisionPayloadDto.IdTransmision,
    );
  }
}