/* src/intereses/dto/id-usuario.dto.ts: */
import { IsInt, Min } from 'class-validator';

export class IdUsuarioDto {
    @IsInt()
    @Min(1)
    IdUsuario: number;
}