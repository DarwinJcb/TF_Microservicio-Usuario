/* src/fotos/dto/fotos-payload.dto.ts */
import { Type } from 'class-transformer';
import {
    IsDefined,
    IsInt,
    Min,
    ValidateNested,
} from 'class-validator';
import { UpdateFotoDto } from './update-foto.dto';

export class IdFotoPayloadDto {
    @Type(() => Number)
    @IsInt()
    @Min(1)
    IdFoto: number;
}

export class IdUsuarioFotosPayloadDto {
    @Type(() => Number)
    @IsInt()
    @Min(1)
    IdUsuario: number;
}

export class ActualizarFotoPayloadDto extends IdFotoPayloadDto {
    @IsDefined()
    @ValidateNested()
    @Type(() => UpdateFotoDto)
    datosFoto: UpdateFotoDto;
}