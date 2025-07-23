import { CommentEntity } from "src/comment/entity/comment.entity";
import { MangaEntity } from "src/manga/entity/manga.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'users'})
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    password: string;

    @Column({
        unique: true
    })
    email: string;

    @Column({
        nullable: true
    })
    avatar: string;

    @ManyToMany(() => MangaEntity, (manga) => manga.users)
    manga: MangaEntity[];

    @OneToMany(() => CommentEntity, (comment) => comment.user, {
        onDelete: 'CASCADE'
    })
    comments: CommentEntity[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}