/* tf_microservicio-usuarios/src/auth/dto/login.dto.ts: */
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'El correo no tiene un formato válido.' })
  @IsNotEmpty({ message: 'El correo es obligatorio.' })
  correo!: string;

  @IsString({ message: 'La contraseña debe ser un texto.' })
  @IsNotEmpty({ message: 'La contraseña es obligatoria.' })
  @MinLength(6, {
    message: 'La contraseña debe tener al menos 6 caracteres.',
  })
  @MaxLength(100, {
    message: 'La contraseña no puede superar los 100 caracteres.',
  })
  contrasena!: string;
}
