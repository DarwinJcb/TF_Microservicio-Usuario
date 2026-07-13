/* src/usuarios/usuarios.service.ts: */
import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioMensajeDto } from './dto/update-usuario-mensaje.dto';

const RONDAS_HASH_CONTRASENA = 10;

@Injectable()
export class UsuariosService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createUsuarioDto: CreateUsuarioDto) {
    const usuarioExistente = await this.prisma.usuario.findFirst({
      where: {
        OR: [
          {
            correo: createUsuarioDto.correo,
          },
          {
            numeroTelefono: createUsuarioDto.numeroTelefono,
          },
        ],
      },
      select: {
        IdUsuario: true,
      },
    });

    if (usuarioExistente) {
      throw new RpcException({
        statusCode: HttpStatus.CONFLICT,
        message:
          'El correo o el número de teléfono ya están registrados.',
        error: 'Conflict',
      });
    }

    const { contrasena, ...datosUsuario } = createUsuarioDto;

    const contrasenaHash = await bcrypt.hash(
      contrasena,
      RONDAS_HASH_CONTRASENA,
    );

    return this.prisma.usuario.create({
      data: {
        ...datosUsuario,
        contrasenaHash,
      },
    });
  }

  findAll() {
    return this.prisma.usuario.findMany({
      include: {
        interes: true,
        fotos: true,
        ubicaciones: true,
        musicas: true,
      },
    });
  }

  async findOne(IdUsuario: number) {
    const usuario = await this.prisma.usuario.findUnique({
      where: {
        IdUsuario,
      },
      include: {
        interes: true,
        fotos: true,
        ubicaciones: true,
        musicas: true,
      },
    });

    if (!usuario) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No existe un usuario con el ID ${IdUsuario}.`,
        error: 'Not Found',
      });
    }

    return usuario;
  }

  async update(updateUsuarioDto: UpdateUsuarioMensajeDto) {
    const { IdUsuario, ...datosUsuario } = updateUsuarioDto;

    await this.verificarUsuarioExiste(IdUsuario);

    if (datosUsuario.correo !== undefined) {
      const usuarioConCorreo = await this.prisma.usuario.findFirst({
        where: {
          correo: datosUsuario.correo,
          NOT: {
            IdUsuario,
          },
        },
        select: {
          IdUsuario: true,
        },
      });

      if (usuarioConCorreo) {
        throw new RpcException({
          statusCode: HttpStatus.CONFLICT,
          message: 'El correo ya está registrado.',
          error: 'Conflict',
        });
      }
    }

    if (datosUsuario.numeroTelefono !== undefined) {
      const usuarioConTelefono = await this.prisma.usuario.findFirst({
        where: {
          numeroTelefono: datosUsuario.numeroTelefono,
          NOT: {
            IdUsuario,
          },
        },
        select: {
          IdUsuario: true,
        },
      });

      if (usuarioConTelefono) {
        throw new RpcException({
          statusCode: HttpStatus.CONFLICT,
          message: 'El número de teléfono ya está registrado.',
          error: 'Conflict',
        });
      }
    }

    return this.prisma.usuario.update({
      where: {
        IdUsuario,
      },
      data: datosUsuario,
    });
  }

  async remove(IdUsuario: number) {
    await this.verificarUsuarioExiste(IdUsuario);

    const [
      interes,
      foto,
      ubicacion,
      musica,
      transmision,
      donacion,
    ] = await Promise.all([
      this.prisma.interes.findUnique({
        where: {
          UsuarioFK: IdUsuario,
        },
        select: {
          IdInteres: true,
        },
      }),
      this.prisma.foto.findFirst({
        where: {
          UsuarioFK: IdUsuario,
        },
        select: {
          IdFoto: true,
        },
      }),
      this.prisma.ubicacion.findFirst({
        where: {
          UsuarioFK: IdUsuario,
        },
        select: {
          IdUbicacion: true,
        },
      }),
      this.prisma.musica.findFirst({
        where: {
          UsuarioFK: IdUsuario,
        },
        select: {
          IdMusica: true,
        },
      }),
      this.prisma.transmision.findFirst({
        where: {
          UsuarioFK: IdUsuario,
        },
        select: {
          IdTransmision: true,
        },
      }),
      this.prisma.donacion.findFirst({
        where: {
          OR: [
            {
              UsuarioDonanteFK: IdUsuario,
            },
            {
              UsuarioReceptorFK: IdUsuario,
            },
          ],
        },
        select: {
          IdDonacion: true,
        },
      }),
    ]);

    const tieneDependenciasLocales = [
      interes,
      foto,
      ubicacion,
      musica,
      transmision,
      donacion,
    ].some((dependencia) => dependencia !== null);

    if (tieneDependenciasLocales) {
      throw new RpcException({
        statusCode: HttpStatus.CONFLICT,
        message:
          'No se puede eliminar el usuario porque tiene información asociada en el microservicio de usuarios.',
        error: 'Conflict',
      });
    }

    return this.prisma.usuario.delete({
      where: {
        IdUsuario,
      },
    });
  }

  async validarExistencia(IdUsuario: number): Promise<boolean> {
    const usuario = await this.prisma.usuario.findUnique({
      where: {
        IdUsuario,
      },
      select: {
        IdUsuario: true,
      },
    });

    return usuario !== null;
  }

  private async verificarUsuarioExiste(
    IdUsuario: number,
  ): Promise<void> {
    const existe = await this.validarExistencia(IdUsuario);

    if (!existe) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No existe un usuario con el ID ${IdUsuario}.`,
        error: 'Not Found',
      });
    }
  }
}