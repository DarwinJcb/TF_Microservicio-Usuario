/* src/ubicaciones/dto/update-ubicacion-mensaje.dto.ts: */
import { IsInt, Min } from 'class-validator';
import { UpdateUbicacionDto } from './update-ubicacion.dto';

export class UpdateUbicacionMensajeDto extends UpdateUbicacionDto {
  @IsInt()
  @Min(1)
  IdUbicacion: number;
}
