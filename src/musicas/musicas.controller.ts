/* src/musicas/musicas.controller.ts: */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateMusicaDto } from './dto/create-musica.dto';
import { UpdateMusicaDto } from './dto/update-musica.dto';
import { MusicasService } from './musicas.service';

@Controller('musicas')
export class MusicasController {
  constructor(private readonly musicasService: MusicasService) {}

  @Post()
  create(@Body() createMusicaDto: CreateMusicaDto) {
    return this.musicasService.create(createMusicaDto);
  }

  @Get()
  findAll() {
    return this.musicasService.findAll();
  }

  @Get('usuario/:idUsuario')
  findByUsuario(@Param('idUsuario', ParseIntPipe) idUsuario: number) {
    return this.musicasService.findByUsuario(idUsuario);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.musicasService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMusicaDto: UpdateMusicaDto,
  ) {
    return this.musicasService.update(id, updateMusicaDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.musicasService.remove(id);
  }
}
