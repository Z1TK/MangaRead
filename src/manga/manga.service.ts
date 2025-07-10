import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MangaEntity } from './entity/manga.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MangaService {
    constructor(
        @InjectRepository(MangaEntity)
        private mangaRepository: Repository<MangaEntity>
    ) {}

    async findAll(): Promise<MangaEntity[]> {
        return await this.mangaRepository.find();
    }


}
