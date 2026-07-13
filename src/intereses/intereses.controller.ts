/* src/intereses/intereses.controller.ts: */
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { IdUsuarioDto } from '../usuarios/dto/id-usuario.dto';
import { CreateInteresDto } from './dto/create-interes.dto';
import { IdInteresDto } from './dto/id-interes.dto';
import { UpdateInteresMensajeDto } from './dto/update-interes-mensaje.dto';
import { InteresesService } from './intereses.service';
import { PATRONES_INTERESES } from './patrones/intereses.patrones';

@Controller()
export class InteresesController {
  constructor(private readonly interesesService: InteresesService) {}

  @MessagePattern(PATRONES_INTERESES.CREAR)
  create(@Payload() createInteresDto: CreateInteresDto) {
    return this.interesesService.create(createInteresDto);
  }

  @MessagePattern(PATRONES_INTERESES.LISTAR)
  findAll() {
    return this.interesesService.findAll();
  }

  @MessagePattern(PATRONES_INTERESES.BUSCAR_POR_USUARIO)
  findByUsuario(@Payload() idUsuarioDto: IdUsuarioDto) {
    return this.interesesService.findByUsuario(idUsuarioDto.IdUsuario);
  }

  @MessagePattern(PATRONES_INTERESES.BUSCAR)
  findOne(@Payload() idInteresDto: IdInteresDto) {
    return this.interesesService.findOne(idInteresDto.IdInteres);
  }

  @MessagePattern(PATRONES_INTERESES.ACTUALIZAR)
  update(
    @Payload()
    updateInteresDto: UpdateInteresMensajeDto,
  ) {
    return this.interesesService.update(updateInteresDto);
  }

  @MessagePattern(PATRONES_INTERESES.ELIMINAR)
  remove(@Payload() idInteresDto: IdInteresDto) {
    return this.interesesService.remove(idInteresDto.IdInteres);
  }
}
