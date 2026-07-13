/* src/usuarios/dto/update-usuario.dto.ts: */
import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsOptional } from 'class-validator';
import { EstadoActividad } from '../../generated/prisma/enums';
import { CreateUsuarioDto } from './create-usuario.dto';

export class UpdateUsuarioDto extends PartialType(
  OmitType(CreateUsuarioDto, ['contrasena'] as const),
) {
  @IsOptional()
  @IsEnum(EstadoActividad)
  estadoActividad?: EstadoActividad;
}
