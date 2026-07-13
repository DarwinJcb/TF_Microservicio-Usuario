/* src/usuarios/usuarios.controller.ts: */
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { IdUsuarioDto } from './dto/id-usuario.dto';
import { UpdateUsuarioMensajeDto } from './dto/update-usuario-mensaje.dto';
import { PATRONES_USUARIOS } from './patrones/usuarios.patrones';
import { UsuariosService } from './usuarios.service';

@Controller()
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @MessagePattern(PATRONES_USUARIOS.CREAR)
  create(@Payload() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }

  @MessagePattern(PATRONES_USUARIOS.LISTAR)
  findAll() {
    return this.usuariosService.findAll();
  }

  @MessagePattern(PATRONES_USUARIOS.BUSCAR)
  findOne(@Payload() idUsuarioDto: IdUsuarioDto) {
    return this.usuariosService.findOne(idUsuarioDto.IdUsuario);
  }

  @MessagePattern(PATRONES_USUARIOS.ACTUALIZAR)
  update(
    @Payload()
    updateUsuarioDto: UpdateUsuarioMensajeDto,
  ) {
    return this.usuariosService.update(updateUsuarioDto);
  }

  @MessagePattern(PATRONES_USUARIOS.ELIMINAR)
  remove(@Payload() idUsuarioDto: IdUsuarioDto) {
    return this.usuariosService.remove(idUsuarioDto.IdUsuario);
  }

  @MessagePattern(PATRONES_USUARIOS.VALIDAR_EXISTENCIA)
  validarExistencia(@Payload() idUsuarioDto: IdUsuarioDto): Promise<boolean> {
    return this.usuariosService.validarExistencia(idUsuarioDto.IdUsuario);
  }
}
