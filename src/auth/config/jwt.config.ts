/* src/auth/config/jwt.config.ts */
import { ConfigService } from '@nestjs/config';

export const DURACION_TOKEN_SEGUNDOS = 60 * 60 * 24 * 30;

export function obtenerSecretoJwt(
  configService: ConfigService,
): string {
  const secretoJwt = configService.get<string>('JWT_SECRET');

  if (!secretoJwt || secretoJwt.trim().length === 0) {
    throw new Error(
      'La variable de entorno JWT_SECRET no está definida en el archivo .env.',
    );
  }

  return secretoJwt;
}