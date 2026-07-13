/* src/app.module.ts: */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsuariosModule } from './usuarios/usuarios.module';
import { InteresesModule } from './intereses/intereses.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsuariosModule,
    InteresesModule,
  ],
})
export class AppModule { }
