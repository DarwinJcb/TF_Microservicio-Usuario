/* src/musicas/dto/create-musica.dto.ts: */
import {
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
    Min,
} from 'class-validator';

export class CreateMusicaDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    nombreCancion?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    tipoMusica?: string;

    @IsInt()
    @Min(1)
    UsuarioFK: number;
}