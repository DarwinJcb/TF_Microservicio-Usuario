/* src/app.module.ts: */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FotosModule } from './fotos/fotos.module';
import { InteresesModule } from './intereses/intereses.module';
import { UsuariosModule } from './usuarios/usuarios.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsuariosModule,
    InteresesModule,
    FotosModule,
  ],
})
export class AppModule { }