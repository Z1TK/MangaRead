import { Body, Controller, Get, Post } from '@nestjs/common';
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
  async findById(id: string) {
    return await this.mangaService.findById(id)
  }

  @Post()
  async create(@Body() dto: MangaDto) {
    return await this.mangaService.create(dto);
  }
}
