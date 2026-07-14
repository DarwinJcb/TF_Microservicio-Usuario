/* src/intereses/intereses.controller.ts */
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateInteresDto } from './dto/create-interes.dto';
import {
  ActualizarInteresPayloadDto,
  IdInteresPayloadDto,
  IdUsuarioInteresesPayloadDto,
} from './dto/intereses-payload.dto';
import { INTERESES_PATTERNS } from './intereses.patterns';
import { InteresesService } from './intereses.service';

@Controller()
export class InteresesController {
  constructor(private readonly interesesService: InteresesService) { }

  @MessagePattern(INTERESES_PATTERNS.CREAR)
  create(@Payload() createInteresDto: CreateInteresDto) {
    return this.interesesService.create(createInteresDto);
  }

  @MessagePattern(INTERESES_PATTERNS.LISTAR)
  findAll() {
    return this.interesesService.findAll();
  }

  @MessagePattern(INTERESES_PATTERNS.BUSCAR_POR_USUARIO)
  findByUsuario(
    @Payload()
    idUsuarioPayloadDto: IdUsuarioInteresesPayloadDto,
  ) {
    return this.interesesService.findByUsuario(
      idUsuarioPayloadDto.IdUsuario,
    );
  }

  @MessagePattern(INTERESES_PATTERNS.BUSCAR_POR_ID)
  findOne(@Payload() idInteresPayloadDto: IdInteresPayloadDto) {
    return this.interesesService.findOne(
      idInteresPayloadDto.IdInteres,
    );
  }

  @MessagePattern(INTERESES_PATTERNS.ACTUALIZAR)
  update(
    @Payload()
    actualizarInteresPayloadDto: ActualizarInteresPayloadDto,
  ) {
    return this.interesesService.update(
      actualizarInteresPayloadDto.IdInteres,
      actualizarInteresPayloadDto.datosInteres,
    );
  }

  @MessagePattern(INTERESES_PATTERNS.ELIMINAR)
  remove(@Payload() idInteresPayloadDto: IdInteresPayloadDto) {
    return this.interesesService.remove(
      idInteresPayloadDto.IdInteres,
    );
  }
}