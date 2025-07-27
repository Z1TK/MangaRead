import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { MangaService } from './manga.service';
import { MangaDto } from './dto/manga.dto';
import { Authorization } from 'src/user/decorator/auth.decorator';

@Controller('manga')
export class MangaController {
  constructor(private readonly mangaService: MangaService) {}

  @Get()
  async findAll() {
    return await this.mangaService.findAll();
  }

  @Get(":id")
  async findById(@Param('id') id: string) {
    return await this.mangaService.findById(id)
  }

  @Authorization()
  @Post()
  async create(@Body() dto: MangaDto) {
    return await this.mangaService.create(dto);
  }

  @Authorization()
  @Patch(":id")
  async update(@Param('id') id:string, @Body() dto:MangaDto) {
    return await this.mangaService.update(id, dto);
  }

  @Delete(":id")
  async remove(@Param('id') id:string) {
    return await this.mangaService.delete(id);
  }
}
