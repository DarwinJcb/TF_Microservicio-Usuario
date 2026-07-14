/* src/transmisiones/dto/transmisiones-payload.dto.ts */
import { Type } from 'class-transformer';
import { IsDefined, IsInt, Min, ValidateNested } from 'class-validator';
import { UpdateTransmisionDto } from './update-transmision.dto';

export class IdTransmisionPayloadDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  IdTransmision: number;
}

export class IdUsuarioTransmisionesPayloadDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  IdUsuario: number;
}

export class ActualizarTransmisionPayloadDto extends IdTransmisionPayloadDto {
  @IsDefined()
  @ValidateNested()
  @Type(() => UpdateTransmisionDto)
  datosTransmision: UpdateTransmisionDto;
}
