import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TagEntity } from './entity/tag.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class TagService {
    constructor(
        @InjectRepository(TagEntity)
        private tagRepository: Repository<TagEntity>
    ) {}

    async findall(): Promise<TagEntity[]> {
        return await this.tagRepository.find();
    }

    async findByIds(ids: number[]): Promise<TagEntity[]> {
        return await this.tagRepository.findBy({
            id: In(ids)
        })
    }
}
