import { Module } from '@nestjs/common';
import { MangaService } from './manga.service';
import { MangaController } from './manga.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MangaEntity } from './entity/manga.entity';
import { AuthorEntity } from 'src/author/entity/author.entity';
import { AuthorService } from 'src/author/author.service';
import { PublisherService } from 'src/publisher/publisher.service';
import { GenreService } from 'src/genre/genre.service';
import { TagService } from 'src/tag/tag.service';
import { PublisherEntity } from 'src/publisher/entity/publisher.entity';
import { GenreEntity } from 'src/genre/entity/genre.entity';
import { TagEntity } from 'src/tag/entity/tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    MangaEntity,
    AuthorEntity,
    PublisherEntity,
    GenreEntity,
    TagEntity
  ])],
  controllers: [MangaController],
  providers: [
    MangaService,
    AuthorService,
    PublisherService,
    GenreService,
    TagService
  ],
})
export class MangaModule {}
