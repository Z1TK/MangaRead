import { MangaEntity } from "src/manga/entity/manga.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Exclude } from "class-transformer"

@Entity({name: 'genres'})
export class GenreEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true
    })
    name: string;

    @ManyToMany(() => MangaEntity, (manga) => manga.genres)
    @Exclude()
    manga: MangaEntity[];
}