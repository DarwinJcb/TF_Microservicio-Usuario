import { Injectable } from '@nestjs/common';
import { CreateUbicacionDto } from './dto/create-ubicacion.dto';
import { UpdateUbicacionDto } from './dto/update-ubicacion.dto';

@Injectable()
export class UbicacionesService {
  create(createUbicacioneDto: CreateUbicacionDto) {
    return 'This action adds a new ubicacione';
  }

  findAll() {
    return `This action returns all ubicaciones`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ubicacione`;
  }

  update(id: number, updateUbicacioneDto: UpdateUbicacionDto) {
    return `This action updates a #${id} ubicacione`;
  }

  remove(id: number) {
    return `This action removes a #${id} ubicacione`;
  }
}
