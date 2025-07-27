import { MangaEntity } from "src/manga/entity/manga.entity";
import { UserEntity } from "src/user/entity/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'comments'})
export class CommentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @ManyToOne(() => UserEntity, (user) => user.comments)
    user: UserEntity;

    @ManyToOne(() => MangaEntity, (manga) => manga.comments)
    @JoinColumn({
        name: 'manga_id'
    })
    manga: MangaEntity;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}