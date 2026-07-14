/* src/donaciones/donaciones.service.ts: */
import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { EstadoTransmision } from '../generated/prisma/enums';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDonacionDto } from './dto/create-donacion.dto';
import { UpdateDonacionDto } from './dto/update-donacion.dto';

@Injectable()
export class DonacionesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDonacionDto: CreateDonacionDto) {
    const { UsuarioDonanteFK, UsuarioReceptorFK, TransmisionFK } =
      createDonacionDto;

    this.verificarUsuariosDiferentes(UsuarioDonanteFK, UsuarioReceptorFK);

    await Promise.all([
      this.verificarUsuario(UsuarioDonanteFK),
      this.verificarUsuario(UsuarioReceptorFK),
    ]);

    if (TransmisionFK !== undefined) {
      await this.verificarTransmisionParaDonacion(
        TransmisionFK,
        UsuarioReceptorFK,
      );
    }

    return this.prisma.donacion.create({
      data: createDonacionDto,
      include: {
        usuarioDonante: true,
        usuarioReceptor: true,
        transmision: true,
      },
    });
  }

  findAll() {
    return this.prisma.donacion.findMany({
      include: {
        usuarioDonante: true,
        usuarioReceptor: true,
        transmision: true,
      },
      orderBy: {
        fechaDonacion: 'desc',
      },
    });
  }

  async findByDonante(idUsuario: number) {
    await this.verificarUsuario(idUsuario);

    return this.prisma.donacion.findMany({
      where: {
        UsuarioDonanteFK: idUsuario,
      },
      include: {
        usuarioDonante: true,
        usuarioReceptor: true,
        transmision: true,
      },
      orderBy: {
        fechaDonacion: 'desc',
      },
    });
  }

  async findByReceptor(idUsuario: number) {
    await this.verificarUsuario(idUsuario);

    return this.prisma.donacion.findMany({
      where: {
        UsuarioReceptorFK: idUsuario,
      },
      include: {
        usuarioDonante: true,
        usuarioReceptor: true,
        transmision: true,
      },
      orderBy: {
        fechaDonacion: 'desc',
      },
    });
  }

  async findByTransmision(idTransmision: number) {
    await this.verificarTransmision(idTransmision);

    return this.prisma.donacion.findMany({
      where: {
        TransmisionFK: idTransmision,
      },
      include: {
        usuarioDonante: true,
        usuarioReceptor: true,
        transmision: true,
      },
      orderBy: {
        fechaDonacion: 'desc',
      },
    });
  }

  async findOne(id: number) {
    const donacion = await this.prisma.donacion.findUnique({
      where: {
        IdDonacion: id,
      },
      include: {
        usuarioDonante: true,
        usuarioReceptor: true,
        transmision: true,
      },
    });

    if (!donacion) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No existe una donación con el ID ${id}.`,
        error: 'Not Found',
      });
    }

    return donacion;
  }

  async update(id: number, updateDonacionDto: UpdateDonacionDto) {
    const donacionActual = await this.findOne(id);

    const idUsuarioDonante =
      updateDonacionDto.UsuarioDonanteFK ?? donacionActual.UsuarioDonanteFK;

    const idUsuarioReceptor =
      updateDonacionDto.UsuarioReceptorFK ?? donacionActual.UsuarioReceptorFK;

    const idTransmision =
      updateDonacionDto.TransmisionFK !== undefined
        ? updateDonacionDto.TransmisionFK
        : donacionActual.TransmisionFK;

    const cambiaReceptor =
      updateDonacionDto.UsuarioReceptorFK !== undefined &&
      updateDonacionDto.UsuarioReceptorFK !== donacionActual.UsuarioReceptorFK;

    const cambiaTransmision =
      updateDonacionDto.TransmisionFK !== undefined &&
      updateDonacionDto.TransmisionFK !== donacionActual.TransmisionFK;

    this.verificarUsuariosDiferentes(idUsuarioDonante, idUsuarioReceptor);

    await Promise.all([
      this.verificarUsuario(idUsuarioDonante),
      this.verificarUsuario(idUsuarioReceptor),
    ]);

    if ((cambiaReceptor || cambiaTransmision) && idTransmision !== null) {
      await this.verificarTransmisionParaDonacion(
        idTransmision,
        idUsuarioReceptor,
      );
    }

    return this.prisma.donacion.update({
      where: {
        IdDonacion: id,
      },
      data: updateDonacionDto,
      include: {
        usuarioDonante: true,
        usuarioReceptor: true,
        transmision: true,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.donacion.delete({
      where: {
        IdDonacion: id,
      },
    });
  }

  private async verificarUsuario(idUsuario: number): Promise<void> {
    const usuario = await this.prisma.usuario.findUnique({
      where: {
        IdUsuario: idUsuario,
      },
      select: {
        IdUsuario: true,
      },
    });

    if (!usuario) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No existe un usuario con el ID ${idUsuario}.`,
        error: 'Not Found',
      });
    }
  }

  private async verificarTransmision(idTransmision: number): Promise<void> {
    const transmision = await this.prisma.transmision.findUnique({
      where: {
        IdTransmision: idTransmision,
      },
      select: {
        IdTransmision: true,
      },
    });

    if (!transmision) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No existe una transmisión con el ID ${idTransmision}.`,
        error: 'Not Found',
      });
    }
  }

  private async verificarTransmisionParaDonacion(
    idTransmision: number,
    idUsuarioReceptor: number,
  ): Promise<void> {
    const transmision = await this.prisma.transmision.findUnique({
      where: {
        IdTransmision: idTransmision,
      },
      select: {
        estado: true,
        UsuarioFK: true,
      },
    });

    if (!transmision) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No existe una transmisión con el ID ${idTransmision}.`,
        error: 'Not Found',
      });
    }

    if (transmision.estado !== EstadoTransmision.LIVE) {
      throw new RpcException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Solo se pueden registrar donaciones en transmisiones LIVE.',
        error: 'Bad Request',
      });
    }

    if (transmision.UsuarioFK !== idUsuarioReceptor) {
      throw new RpcException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'El usuario receptor no es el propietario de la transmisión.',
        error: 'Bad Request',
      });
    }
  }

  private verificarUsuariosDiferentes(
    idUsuarioDonante: number,
    idUsuarioReceptor: number,
  ): void {
    if (idUsuarioDonante === idUsuarioReceptor) {
      throw new RpcException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Un usuario no puede realizarse una donación a sí mismo.',
        error: 'Bad Request',
      });
    }
  }
}
