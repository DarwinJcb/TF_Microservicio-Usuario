/* src/ubicaciones/dto/create-ubicacion.dto.ts: */
import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class CreateUbicacionDto {
  @IsOptional()
  @IsString()
  ubicacion?: string;

  @IsString()
  @IsNotEmpty()
  ciudad: string;

  @IsString()
  @IsNotEmpty()
  pais: string;

  @IsInt()
  @Min(1)
  UsuarioFK: number;
}
