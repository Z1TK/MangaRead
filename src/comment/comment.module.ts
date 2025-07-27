import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from './entity/comment.entity';
import { MangaEntity } from 'src/manga/entity/manga.entity';
import { MangaService } from 'src/manga/manga.service';
import { AuthorEntity } from 'src/author/entity/author.entity';
import { AuthorService } from 'src/author/author.service';
import { MangaModule } from 'src/manga/manga.module';

@Module({
  imports: [TypeOrmModule.forFeature([
    CommentEntity, 
  ]),
  MangaModule,
  ],
  controllers: [CommentController],
  providers: [
    CommentService,
  ],
})
export class CommentModule {}
