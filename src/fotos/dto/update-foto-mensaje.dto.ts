/* src/fotos/dto/update-foto-mensaje.dto.ts: */
import { IsInt, Min } from 'class-validator';
import { UpdateFotoDto } from './update-foto.dto';

export class UpdateFotoMensajeDto extends UpdateFotoDto {
    @IsInt()
    @Min(1)
    IdFoto: number;
}