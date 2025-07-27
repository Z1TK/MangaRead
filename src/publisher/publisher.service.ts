import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PublisherEntity } from './entity/publisher.entity';
import { Repository } from 'typeorm';
import { PublisherDto } from './dto/publisher.entity';

@Injectable()
export class PublisherService {
    constructor(
        @InjectRepository(PublisherEntity)
        private publisherRepository: Repository<PublisherEntity>
    ) {}

    async findall(): Promise<PublisherEntity[]> {
            return await this.publisherRepository.find();
        }

    async findById(id: string): Promise<PublisherEntity> {
        const author = await this.publisherRepository.findOne({
            where: { id },
            relations: {
                manga: true
            }
        });

        if (!author) {
            throw new NotFoundException();
        }

        return author;
    }

    async create(dto: PublisherDto): Promise<PublisherEntity> {
        const author = this.publisherRepository.create(dto);

        return await this.publisherRepository.save(author);
    }

    async update(id: string, dto: PublisherDto): Promise<Boolean> {
        const author = await this.findById(id);

        Object.assign(author, dto);

        await this.publisherRepository.save(author);

        return true;
    }

    async delete(id: string): Promise<Boolean> {
        const author = await this.findById(id);

        await this.publisherRepository.remove(author);

        return true;
    }
}
