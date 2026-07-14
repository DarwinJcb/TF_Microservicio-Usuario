/* tf_microservicio-usuarios/src/usuarios/dto/actualizar-usuario-payload.dto.ts */
import { Type } from 'class-transformer';
import { IsDefined, ValidateNested } from 'class-validator';
import { IdUsuarioDto } from './id-usuario.dto';
import { UpdateUsuarioDto } from './update-usuario.dto';

export class ActualizarUsuarioPayloadDto extends IdUsuarioDto {
  @IsDefined()
  @ValidateNested()
  @Type(() => UpdateUsuarioDto)
  datosUsuario: UpdateUsuarioDto;
}