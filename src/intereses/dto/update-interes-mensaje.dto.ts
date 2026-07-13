/* src/intereses/dto/update-interes-mensaje.dto.ts: */
import { IsInt, Min } from 'class-validator';
import { UpdateInteresDto } from './update-interes.dto';

export class UpdateInteresMensajeDto extends UpdateInteresDto {
    @IsInt()
    @Min(1)
    IdInteres: number;
}