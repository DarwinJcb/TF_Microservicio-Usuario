/* tf_microservicio-usuarios/src/auth/auth.service.ts */
import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RpcException } from '@nestjs/microservices';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import type { JwtPayload } from './interfaces/jwt-payload.interface';
import type { RespuestaLogin } from './interfaces/respuesta-login.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<RespuestaLogin> {
    const usuario = await this.prisma.usuario.findUnique({
      where: {
        correo: loginDto.correo,
      },
      select: {
        IdUsuario: true,
        correo: true,
        contrasenaHash: true,
      },
    });

    if (!usuario?.contrasenaHash) {
      throw this.crearExcepcionCredencialesIncorrectas();
    }

    const contrasenaValida = await bcrypt.compare(
      loginDto.contrasena,
      usuario.contrasenaHash,
    );

    if (!contrasenaValida) {
      throw this.crearExcepcionCredencialesIncorrectas();
    }

    const payload: JwtPayload = {
      sub: usuario.IdUsuario,
      correo: usuario.correo,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      access_token: accessToken,
    };
  }

  private crearExcepcionCredencialesIncorrectas(): RpcException {
    return new RpcException({
      statusCode: HttpStatus.UNAUTHORIZED,
      message: 'Correo o contraseña incorrectos.',
      error: 'Unauthorized',
    });
  }
}
