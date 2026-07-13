/* src/musicas/musicas.controller.ts: */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MusicasService } from './musicas.service';
import { CreateMusicaDto } from './dto/create-musica.dto';
import { UpdateMusicaDto } from './dto/update-musica.dto';

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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.musicasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMusicaDto: UpdateMusicaDto) {
    return this.musicasService.update(+id, updateMusicaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.musicasService.remove(+id);
  }
}
