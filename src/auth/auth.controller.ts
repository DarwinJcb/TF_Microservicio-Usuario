/* src/auth/auth.controller.ts */
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AUTH_PATTERNS } from './auth.patterns';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import type { RespuestaLogin } from './interfaces/respuesta-login.interface';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @MessagePattern(AUTH_PATTERNS.LOGIN)
  login(
    @Payload() loginDto: LoginDto,
  ): Promise<RespuestaLogin> {
    return this.authService.login(loginDto);
  }
}