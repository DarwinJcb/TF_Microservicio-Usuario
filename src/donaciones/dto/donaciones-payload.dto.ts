/* src/donaciones/dto/donaciones-payload.dto.ts */
import { Type } from 'class-transformer';
import { IsDefined, IsInt, Min, ValidateNested } from 'class-validator';
import { UpdateDonacionDto } from './update-donacion.dto';

export class IdDonacionPayloadDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  IdDonacion: number;
}

export class IdUsuarioDonacionesPayloadDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  IdUsuario: number;
}

export class IdTransmisionDonacionesPayloadDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  IdTransmision: number;
}

export class ActualizarDonacionPayloadDto extends IdDonacionPayloadDto {
  @IsDefined()
  @ValidateNested()
  @Type(() => UpdateDonacionDto)
  datosDonacion: UpdateDonacionDto;
}
