/* src/auth/auth.module.ts */
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {
  DURACION_TOKEN_SEGUNDOS,
  obtenerSecretoJwt,
} from './config/jwt.config';

@Module({
  imports: [
    PrismaModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: obtenerSecretoJwt(configService),
        signOptions: {
          expiresIn: DURACION_TOKEN_SEGUNDOS,
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
