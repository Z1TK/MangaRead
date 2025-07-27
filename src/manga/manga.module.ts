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
import { AuthorModule } from 'src/author/author.module';
import { PublisherModule } from 'src/publisher/publisher.module';
import { GenreModule } from 'src/genre/genre.module';
import { TagModule } from 'src/tag/tag.module';

@Module({
  imports: [TypeOrmModule.forFeature([
    MangaEntity,
  ]),
  AuthorModule,
  PublisherModule,
  GenreModule,
  TagModule
],
  controllers: [MangaController],
  providers: [
    MangaService,
  ],
  exports: [MangaService]
})
export class MangaModule {}
