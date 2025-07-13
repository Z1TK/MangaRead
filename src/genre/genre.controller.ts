import { Controller, Get, Query } from '@nestjs/common';
import { GenreService } from './genre.service';

@Controller('genre')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Get()
  async findAll() {
    return await this.genreService.fidnall()
  }

  // @Get('by-ids')
  // async findByIds(@Query('genre') genre: number[]) {
  //   return await this.genreService.findByIds(genre);
  // }
}
