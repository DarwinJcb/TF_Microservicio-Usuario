/* src/usuarios/dto/update-usuario-mensaje.dto.ts: */
import { IsInt, Min } from 'class-validator';
import { UpdateUsuarioDto } from './update-usuario.dto';

export class UpdateUsuarioMensajeDto extends UpdateUsuarioDto {
    @IsInt()
    @Min(1)
    IdUsuario: number;
}