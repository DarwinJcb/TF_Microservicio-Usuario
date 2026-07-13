/* src/musicas/dto/update-musica-mensaje.dto.ts: */
import { IsInt, Min } from 'class-validator';
import { UpdateMusicaDto } from './update-musica.dto';

export class UpdateMusicaMensajeDto extends UpdateMusicaDto {
    @IsInt()
    @Min(1)
    IdMusica: number;
}