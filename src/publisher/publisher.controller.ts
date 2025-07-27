import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { PublisherService } from './publisher.service';
import { PublisherDto } from './dto/publisher.entity';
import { Authorization } from 'src/user/decorator/auth.decorator';

@Controller('publishers')
export class PublisherController {
  constructor(private readonly publisherService: PublisherService) {}

  @Get()
    async findAll() {
      return await this.publisherService.findall();
    }
  
    @Get(':id')
    async findById(@Param('id') id: string) {
      return await this.publisherService.findById(id);
    }
  
    @Authorization()
    @Post()
    async create(@Body() dto: PublisherDto) {
      return await this.publisherService.create(dto);
    }
  
    @Authorization()
    @Put(':id')
    async update(@Param('id') id: string, @Body() dto: PublisherDto) {
      return await this.publisherService.update(id, dto);
    }
  
    @Delete(':id')
    async delete(@Param('id') id: string) {
      return await this.publisherService.delete(id);
    }
}
