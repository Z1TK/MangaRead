import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getTypeOrmConfig } from './config/database.config';
import { AuthorModule } from './author/author.module';
import { PublisherModule } from './publisher/publisher.module';
import { MangaModule } from './manga/manga.module';
import { TagModule } from './tag/tag.module';
import { GenreModule } from './genre/genre.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getTypeOrmConfig,
      inject: [ConfigService]
    }),
    AuthorModule,
    PublisherModule,
    MangaModule,
    TagModule,
    GenreModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
