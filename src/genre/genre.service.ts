import { Delete, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { GenreEntity } from './entity/genre.entity';
import { GenreDto } from './dto/genre.dto';

@Injectable()
export class GenreService {
    constructor(
        @InjectRepository(GenreEntity)
        private genreRepository: Repository<GenreEntity>
    ) {}

    async fidnall(): Promise<GenreEntity[]> {
        return await this.genreRepository.find()
    }

    async findByIds(ids: number[]): Promise<GenreEntity[]> {
        return await this.genreRepository.findBy({
            id: In(ids)
        })
    }
}
