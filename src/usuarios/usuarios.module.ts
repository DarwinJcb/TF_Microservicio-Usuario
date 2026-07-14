/* src/usuarios/usuarios.module.ts: */
import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { PrismaInteraccionesModule } from '../prisma-interacciones/prisma-interacciones.module';
import { PrismaSuscripcionesModule } from '../prisma-suscripciones/prisma-suscripciones.module';
import { PrismaUsuariosModule } from '../prisma-usuarios/prisma-usuarios.module';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';

@Module({
  imports: [
    AuthModule,
    PrismaUsuariosModule,
    PrismaSuscripcionesModule,
    PrismaInteraccionesModule,
  ],
  controllers: [UsuariosController],
  providers: [UsuariosService],
})
export class UsuariosModule {}
