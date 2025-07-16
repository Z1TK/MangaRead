import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { MangaService } from './manga.service';
import { MangaDto } from './dto/manga.dto';

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

  @Post()
  async create(@Body() dto: MangaDto) {
    return await this.mangaService.create(dto);
  }

  @Patch(":id")
  async update(@Param('id') id:string, @Body() dto:MangaDto) {
    return await this.mangaService.update(id, dto);
  }

  @Delete(":id")
  async remove(@Param('id') id:string) {
    return await this.mangaService.delete(id);
  }
}
