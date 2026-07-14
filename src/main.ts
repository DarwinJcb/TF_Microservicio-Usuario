/* src/main.ts: */
import { HttpStatus, Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  AsyncMicroserviceOptions,
  MicroserviceOptions,
  RpcException,
  Transport,
} from '@nestjs/microservices';
import { ValidationError } from 'class-validator';
import { AppModule } from './app.module';

const logger = new Logger('MicroservicioUsuarios');

function obtenerHostMicroservicio(configService: ConfigService): string {
  const host = configService.get<string>('HOST_MICROSERVICIO');

  if (!host) {
    throw new Error(
      'La variable de entorno HOST_MICROSERVICIO no está definida.',
    );
  }

  return host;
}

function obtenerPuertoMicroservicio(configService: ConfigService): number {
  const puertoTexto = configService.get<string>('PUERTO_MICROSERVICIO');

  if (!puertoTexto) {
    throw new Error(
      'La variable de entorno PUERTO_MICROSERVICIO no está definida.',
    );
  }

  const puerto = Number(puertoTexto);

  if (!Number.isInteger(puerto) || puerto < 1 || puerto > 65535) {
    throw new Error(
      'La variable PUERTO_MICROSERVICIO debe contener un puerto válido.',
    );
  }

  return puerto;
}

function obtenerMensajesValidacion(errores: ValidationError[]): string[] {
  return errores.flatMap((error) => Object.values(error.constraints ?? {}));
}

async function bootstrap(): Promise<void> {
  const aplicacion =
    await NestFactory.createMicroservice<AsyncMicroserviceOptions>(AppModule, {
      inject: [ConfigService],
      useFactory: (configService: ConfigService): MicroserviceOptions => ({
        transport: Transport.TCP,
        options: {
          host: obtenerHostMicroservicio(configService),
          port: obtenerPuertoMicroservicio(configService),
        },
      }),
    });

  aplicacion.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      validateCustomDecorators: true,
      exceptionFactory: (errores: ValidationError[]): RpcException =>
        new RpcException({
          statusCode: HttpStatus.BAD_REQUEST,
          message: obtenerMensajesValidacion(errores),
          error: 'Bad Request',
        }),
    }),
  );

  aplicacion.enableShutdownHooks();

  const configService = aplicacion.get(ConfigService);
  const host = obtenerHostMicroservicio(configService);
  const puerto = obtenerPuertoMicroservicio(configService);

  await aplicacion.listen();

  logger.log(
    `Microservicio de Usuarios iniciado y escuchando por TCP en ${host}:${puerto}`,
  );
}

bootstrap().catch((error: unknown) => {
  const mensajeError = error instanceof Error ? error.message : String(error);

  const trazaError = error instanceof Error ? error.stack : undefined;

  logger.error(
    `No se pudo iniciar el microservicio de usuarios: ${mensajeError}`,
    trazaError,
  );

  process.exit(1);
});
