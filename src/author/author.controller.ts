import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorDto } from './dto/author.dto';

@Controller('authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get()
  async findAll() {
    return await this.authorService.findall();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.authorService.findById(id);
  }

  @Post()
  async create(@Body() dto: AuthorDto) {
    return await this.authorService.create(dto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: AuthorDto) {
    return await this.authorService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.authorService.delete(id);
  }
}
