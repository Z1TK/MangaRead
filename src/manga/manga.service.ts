import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MangaEntity } from './entity/manga.entity';
import { Repository } from 'typeorm';
import { MangaDto } from './dto/manga.dto';
import { AuthorService } from 'src/author/author.service';
import { PublisherService } from 'src/publisher/publisher.service';
import { GenreService } from 'src/genre/genre.service';
import { TagService } from 'src/tag/tag.service';

@Injectable()
export class MangaService {
    constructor(
        @InjectRepository(MangaEntity)
        private readonly mangaRepository: Repository<MangaEntity>,
        private readonly authorService: AuthorService,
        private readonly publisherService: PublisherService,
        private readonly genreService: GenreService,
        private readonly tagService: TagService
    ) {}

    async findAll(): Promise<MangaEntity[]> {
        return await this.mangaRepository.find({
            select: {
                id: true,
                cover: true,
                title: true,
                type: true
            }
        });
    }

    async findById(id: string): Promise<MangaEntity> {
        const manga = await this.mangaRepository.
        createQueryBuilder('manga').
        leftJoinAndSelect('manga.author', 'author').
        leftJoinAndSelect('manga.publisher', 'publisher').
        leftJoinAndSelect('manga.genres', 'genres').
        leftJoinAndSelect('manga.tags', 'tags').
        select([
            'manga.id', 'manga.title',
            'manga.description',
            'manga.cover', 'author.id',
            'author.name', 'publisher.id',
            'publisher.name', 'genres.id',
            'genres.name', 'tags.id',
            'tags.name'
        ]).where('manga.id = :id', { id }).getOne();

        if (!manga) {
            throw new NotFoundException();
        }

        return manga;
    }


    async create(dto: MangaDto): Promise<MangaEntity> {
        const { 
            title, 
            description, 
            cover,
            alternative_title,
            author_id,
            publisher_id,
            type,
            status,
            release_format,
            genres_ids,
            tags_ids,
            release_year
        } = dto;

        const author = await this.authorService.findById(author_id)

        const publisher = await this.publisherService.findById(publisher_id);

        const genres = await this.genreService.findByIds(genres_ids);

        const tags = await this.tagService.findByIds(tags_ids);

        const manga = this.mangaRepository.create({
            title,
            description,
            cover,
            alternative_title,
            author,
            publisher,
            type,
            status,
            release_format,
            genres,
            tags,
            release_year
        });
            
        return await this.mangaRepository.save(manga);
    }

    async update(id: string, dto: Partial<MangaDto>): Promise<Boolean> {
        const manga = await this.findById(id);

        Object.assign(manga, dto);

        await this.mangaRepository.save(manga);

        return true;
    }

    async delete(id: string): Promise<String> {
        const manga = await this.findById(id);

        await this.mangaRepository.remove(manga);

        return 'The object was deleting'
    }
}
