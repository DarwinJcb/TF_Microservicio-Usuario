/* src/intereses/dto/intereses-payload.dto.ts */
import { Type } from 'class-transformer';
import {
    IsDefined,
    IsInt,
    Min,
    ValidateNested,
} from 'class-validator';
import { UpdateInteresDto } from './update-interes.dto';

export class IdInteresPayloadDto {
    @Type(() => Number)
    @IsInt()
    @Min(1)
    IdInteres: number;
}

export class IdUsuarioInteresesPayloadDto {
    @Type(() => Number)
    @IsInt()
    @Min(1)
    IdUsuario: number;
}

export class ActualizarInteresPayloadDto extends IdInteresPayloadDto {
    @IsDefined()
    @ValidateNested()
    @Type(() => UpdateInteresDto)
    datosInteres: UpdateInteresDto;
}