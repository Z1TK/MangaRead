import { PrimaryGeneratedColumn, Column, ManyToOne, Entity } from "typeorm";
import { ReleaseFormat, StatusManga, TypeManga } from "../enum/manga.enum";
import { AuthorEntity } from "src/author/entity/author.entity";

@Entity({name: 'manga'})
export class MangaEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    cover: string;

    @Column({
        unique: true,
    })
    name: string;

    @Column({
        type: 'text'
    })
    description: string;

    @Column({
        unique: true,
    })
    alternative_name: string;

    @ManyToOne(() => AuthorEntity, (author) => author.manga)
    author: AuthorEntity;

    @Column()
    artist: string;
    
    @Column({
        type: 'enum',
        enum: TypeManga,
    })
    type: TypeManga;

    @Column({
        type: 'enum',
        enum: StatusManga
    })
    status: StatusManga;

    @Column({

    })
    release_yaer: number;

    @Column({
        type: 'enum',
        enum: ReleaseFormat,
        array: true
    })
    release_format: ReleaseFormat[];

    @Column({
        type: 'text',
        array: true
    })
    genres: string[];

    @Column({
        type: 'text',
        array: true
    })
    tags: string[];

}