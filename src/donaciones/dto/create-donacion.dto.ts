/* tf_microservicio-usuarios/src/donaciones/dto/create-donacion.dto.ts */
import { IsInt, IsNumber, IsOptional, IsPositive } from 'class-validator';

export class CreateDonacionDto {
  @IsNumber({
    maxDecimalPlaces: 2,
  })
  @IsPositive()
  monto: number;

  @IsInt()
  UsuarioDonanteFK: number;

  @IsInt()
  UsuarioReceptorFK: number;

  @IsOptional()
  @IsInt()
  TransmisionFK?: number;
}
