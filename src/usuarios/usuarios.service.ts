/* tf_microservicio-usuarios/src/usuarios/usuarios.service.ts */
import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

const RONDAS_HASH_CONTRASENA = 10;

export interface ResultadoDependenciasLocales {
  tieneDependencias: boolean;
  dependencias: string[];
}

@Injectable()
export class UsuariosService {
  constructor(private readonly prisma: PrismaService) {}

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
        message: 'El correo o el número de teléfono ya están registrados.',
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
      orderBy: {
        IdUsuario: 'asc',
      },
    });
  }

  async findOne(idUsuario: number) {
    const usuario = await this.prisma.usuario.findUnique({
      where: {
        IdUsuario: idUsuario,
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
        message: `No existe un usuario con el ID ${idUsuario}.`,
        error: 'Not Found',
      });
    }

    return usuario;
  }

  async update(idUsuario: number, updateUsuarioDto: UpdateUsuarioDto) {
    await this.asegurarUsuarioExiste(idUsuario);

    if (updateUsuarioDto.correo !== undefined) {
      const usuarioConCorreo = await this.prisma.usuario.findFirst({
        where: {
          correo: updateUsuarioDto.correo,
          NOT: {
            IdUsuario: idUsuario,
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

    if (updateUsuarioDto.numeroTelefono !== undefined) {
      const usuarioConTelefono = await this.prisma.usuario.findFirst({
        where: {
          numeroTelefono: updateUsuarioDto.numeroTelefono,
          NOT: {
            IdUsuario: idUsuario,
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
        IdUsuario: idUsuario,
      },
      data: updateUsuarioDto,
    });
  }

  async verificarExistencia(idUsuario: number): Promise<boolean> {
    const usuario = await this.prisma.usuario.findUnique({
      where: {
        IdUsuario: idUsuario,
      },
      select: {
        IdUsuario: true,
      },
    });

    return usuario !== null;
  }

  async verificarDependenciasLocales(
    idUsuario: number,
  ): Promise<ResultadoDependenciasLocales> {
    await this.asegurarUsuarioExiste(idUsuario);

    const [interes, foto, ubicacion, musica, transmision, donacion] =
      await Promise.all([
        this.prisma.interes.findUnique({
          where: {
            UsuarioFK: idUsuario,
          },
          select: {
            IdInteres: true,
          },
        }),
        this.prisma.foto.findFirst({
          where: {
            UsuarioFK: idUsuario,
          },
          select: {
            IdFoto: true,
          },
        }),
        this.prisma.ubicacion.findFirst({
          where: {
            UsuarioFK: idUsuario,
          },
          select: {
            IdUbicacion: true,
          },
        }),
        this.prisma.musica.findFirst({
          where: {
            UsuarioFK: idUsuario,
          },
          select: {
            IdMusica: true,
          },
        }),
        this.prisma.transmision.findFirst({
          where: {
            UsuarioFK: idUsuario,
          },
          select: {
            IdTransmision: true,
          },
        }),
        this.prisma.donacion.findFirst({
          where: {
            OR: [
              {
                UsuarioDonanteFK: idUsuario,
              },
              {
                UsuarioReceptorFK: idUsuario,
              },
            ],
          },
          select: {
            IdDonacion: true,
          },
        }),
      ]);

    const dependencias: string[] = [];

    if (interes) {
      dependencias.push('intereses');
    }

    if (foto) {
      dependencias.push('fotos');
    }

    if (ubicacion) {
      dependencias.push('ubicaciones');
    }

    if (musica) {
      dependencias.push('musicas');
    }

    if (transmision) {
      dependencias.push('transmisiones');
    }

    if (donacion) {
      dependencias.push('donaciones');
    }

    return {
      tieneDependencias: dependencias.length > 0,
      dependencias,
    };
  }

  async remove(idUsuario: number) {
    const resultadoDependencias =
      await this.verificarDependenciasLocales(idUsuario);

    if (resultadoDependencias.tieneDependencias) {
      throw new RpcException({
        statusCode: HttpStatus.CONFLICT,
        message:
          'No se puede eliminar el usuario porque tiene información asociada en el dominio de usuarios.',
        error: 'Conflict',
      });
    }

    return this.prisma.usuario.delete({
      where: {
        IdUsuario: idUsuario,
      },
    });
  }

  private async asegurarUsuarioExiste(idUsuario: number): Promise<void> {
    const existe = await this.verificarExistencia(idUsuario);

    if (!existe) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No existe un usuario con el ID ${idUsuario}.`,
        error: 'Not Found',
      });
    }
  }
}
