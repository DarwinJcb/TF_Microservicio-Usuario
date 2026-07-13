/* src/musicas/dto/id-musica.dto.ts: */
import { IsInt, Min } from 'class-validator';

export class IdMusicaDto {
    @IsInt()
    @Min(1)
    IdMusica: number;
}