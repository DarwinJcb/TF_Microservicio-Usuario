/* tf_microservicio-usuarios/src/app.module.ts: */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { DonacionesModule } from './donaciones/donaciones.module';
import { FotosModule } from './fotos/fotos.module';
import { InteresesModule } from './intereses/intereses.module';
import { MusicasModule } from './musicas/musicas.module';
import { TransmisionesModule } from './transmisiones/transmisiones.module';
import { UbicacionesModule } from './ubicaciones/ubicaciones.module';
import { UsuariosModule } from './usuarios/usuarios.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UsuariosModule,
    InteresesModule,
    FotosModule,
    UbicacionesModule,
    MusicasModule,
    TransmisionesModule,
    DonacionesModule,
  ],
})
export class AppModule {}
