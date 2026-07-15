/* tf_microservicio-usuarios/src/donaciones/dto/create-donacion.dto.ts */
import { IsInt, IsNumber, IsOptional, IsPositive, Min } from 'class-validator';

export class CreateDonacionDto {
  @IsNumber({
    maxDecimalPlaces: 2,
  })
  @IsPositive()
  monto: number;

  @IsInt()
  @Min(1)
  UsuarioDonanteFK: number;

  @IsInt()
  @Min(1)
  UsuarioReceptorFK: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  TransmisionFK?: number | null;
}