/* src/main.ts: */
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  AsyncMicroserviceOptions,
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices';
import { AppModule } from './app.module';

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

  aplicacion.enableShutdownHooks();

  await aplicacion.listen();
}

bootstrap().catch((error: unknown) => {
  console.error('No se pudo iniciar el microservicio de usuarios.', error);

  process.exit(1);
});
