/* src/transmisiones/dto/update-transmision.dto.ts: */
import { IsEnum } from 'class-validator';
import { EstadoTransmision } from '../../generated/prisma-usuarios/enums';

export class UpdateTransmisionDto {
  @IsEnum(EstadoTransmision)
  estado: EstadoTransmision;
}
