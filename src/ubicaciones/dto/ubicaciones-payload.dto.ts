/* tf_microservicio-usuarios/src/ubicaciones/dto/ubicaciones-payload.dto.ts */
import { Type } from 'class-transformer';
import { IsDefined, IsInt, Min, ValidateNested } from 'class-validator';
import { UpdateUbicacionDto } from './update-ubicacion.dto';

export class IdUbicacionPayloadDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  IdUbicacion: number;
}

export class IdUsuarioUbicacionesPayloadDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  IdUsuario: number;
}

export class ActualizarUbicacionPayloadDto extends IdUbicacionPayloadDto {
  @IsDefined()
  @ValidateNested()
  @Type(() => UpdateUbicacionDto)
  datosUbicacion: UpdateUbicacionDto;
}
