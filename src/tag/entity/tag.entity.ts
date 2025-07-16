import { MangaEntity } from "src/manga/entity/manga.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import slugify from "slugify";
import { Exclude } from "class-transformer";

@Entity({name: 'tags'})
export class TagEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({
        unique: true
    })
    name: string;

    @ManyToMany(() => MangaEntity, (manga) => manga.tags)
    manga: MangaEntity[];
}