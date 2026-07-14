/* tf_microservicio-usuarios/src/transmisiones/dto/update-transmision.dto.ts */
import { IsEnum } from 'class-validator';
import { EstadoTransmision } from '../../generated/prisma/enums';

export class UpdateTransmisionDto {
  @IsEnum(EstadoTransmision)
  estado: EstadoTransmision;
}
