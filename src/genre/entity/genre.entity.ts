import { MangaEntity } from "src/manga/entity/manga.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import slugify from "slugify";

@Entity({name: 'genres'})
export class GenreEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        unique: true
    })
    name: string;

    @ManyToMany(() => MangaEntity, (manga) => manga.genres)
    manga: MangaEntity[];
}