/* tf_microservicio-usuarios/src/usuarios/usuarios.controller.ts */
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ActualizarUsuarioPayloadDto } from './dto/actualizar-usuario-payload.dto';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { IdUsuarioDto } from './dto/id-usuario.dto';
import { USUARIOS_PATTERNS } from './usuarios.patterns';
import { UsuariosService } from './usuarios.service';

@Controller()
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @MessagePattern(USUARIOS_PATTERNS.CREAR)
  create(@Payload() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }

  @MessagePattern(USUARIOS_PATTERNS.LISTAR)
  findAll() {
    return this.usuariosService.findAll();
  }

  @MessagePattern(USUARIOS_PATTERNS.BUSCAR_POR_ID)
  findOne(@Payload() idUsuarioDto: IdUsuarioDto) {
    return this.usuariosService.findOne(idUsuarioDto.IdUsuario);
  }

  @MessagePattern(USUARIOS_PATTERNS.ACTUALIZAR)
  update(
    @Payload()
    actualizarUsuarioPayloadDto: ActualizarUsuarioPayloadDto,
  ) {
    return this.usuariosService.update(
      actualizarUsuarioPayloadDto.IdUsuario,
      actualizarUsuarioPayloadDto.datosUsuario,
    );
  }

  @MessagePattern(USUARIOS_PATTERNS.ELIMINAR)
  remove(@Payload() idUsuarioDto: IdUsuarioDto) {
    return this.usuariosService.remove(idUsuarioDto.IdUsuario);
  }

  @MessagePattern(USUARIOS_PATTERNS.VERIFICAR_EXISTENCIA)
  verificarExistencia(@Payload() idUsuarioDto: IdUsuarioDto) {
    return this.usuariosService.verificarExistencia(idUsuarioDto.IdUsuario);
  }

  @MessagePattern(USUARIOS_PATTERNS.VERIFICAR_DEPENDENCIAS_LOCALES)
  verificarDependenciasLocales(@Payload() idUsuarioDto: IdUsuarioDto) {
    return this.usuariosService.verificarDependenciasLocales(
      idUsuarioDto.IdUsuario,
    );
  }
}
