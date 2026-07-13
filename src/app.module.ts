/* src/app.module.ts: */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FotosModule } from './fotos/fotos.module';
import { InteresesModule } from './intereses/intereses.module';
import { UbicacionesModule } from './ubicaciones/ubicaciones.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { MusicasModule } from './musicas/musicas.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsuariosModule,
    InteresesModule,
    FotosModule,
    UbicacionesModule,
    MusicasModule,
  ],
})
export class AppModule {}
