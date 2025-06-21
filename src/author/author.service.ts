import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthorEntity } from './entity/author.entity';
import { Repository } from 'typeorm';
import { AuthorDto } from './dto/author.dto';
import { NotFoundError } from 'rxjs';

@Injectable()
export class AuthorService {
    constructor(
        @InjectRepository(AuthorEntity)
        private authorRepository: Repository<AuthorEntity>,
    ) {}

    async findall(): Promise<AuthorEntity[]> {
        return await this.authorRepository.find();
    }

    async findById(id: string): Promise<AuthorEntity> {
        const author = await this.authorRepository.findOne({
            where: { id }
        });

        if (!author) {
            throw new NotFoundException();
        }

        return author;
    }

    async create(dto: AuthorDto): Promise<AuthorEntity> {
        const author = this.authorRepository.create(dto);

        return await this.authorRepository.save(author);
    }

    async update(id: string, dto: AuthorDto): Promise<Boolean> {
        const author = await this.findById(id);

        Object.assign(author, dto);

        await this.authorRepository.save(author);

        return true;
    }

    async delete(id: string): Promise<Boolean> {
        const author = await this.findById(id);

        await this.authorRepository.remove(author);

        return true;
    }
}
