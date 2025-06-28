import { Module } from '@nestjs/common';
import { MangaService } from './manga.service';
import { MangaController } from './manga.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MangaEntity } from './entity/manga.entity';
import { AuthorEntity } from 'src/author/entity/author.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MangaEntity])],
  controllers: [MangaController],
  providers: [MangaService],
})
export class MangaModule {}
