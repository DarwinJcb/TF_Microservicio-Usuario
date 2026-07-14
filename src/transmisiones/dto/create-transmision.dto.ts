/* src/transmisiones/dto/create-transmision.dto.ts: */
import { IsInt } from 'class-validator';

export class CreateTransmisionDto {
  @IsInt()
  UsuarioFK: number;
}
