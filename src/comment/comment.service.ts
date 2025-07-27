import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from './entity/comment.entity';
import { Equal, Repository } from 'typeorm';
import { CommentDto } from './dto/comment.dto';
import { MangaService } from 'src/manga/manga.service';
import { UserEntity } from 'src/user/entity/user.entity';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(CommentEntity)
        private readonly commentRepository: Repository<CommentEntity>,
        private readonly mangaService: MangaService
    ) {}

    async findByManga(manga_id: string): Promise<CommentEntity[]> {
        return await this.commentRepository.find({
            where: {
                manga: Equal(manga_id)
            }
        });
    }

    async findByUser(user: UserEntity) {
        return await this.commentRepository.find({
            where: {
                user: Equal(user.id)
            }
        })
    }

    async create(
        user: UserEntity, dto: CommentDto
    ): Promise<CommentEntity> {
        const { content, manga_id} = dto;

        const manga = await this.mangaService.findById(manga_id);

        const comment = this.commentRepository.create({
            content,
            manga,
            user
        })

        return await this.commentRepository.save(comment);
    }

    async delete(user: UserEntity): Promise<String> {
        const comment = await this.findByUser(user);

        await this.commentRepository.remove(comment);

        return 'The comment was deleting';
    }
}
