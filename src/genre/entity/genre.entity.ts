import { MangaEntity } from "src/manga/entity/manga.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import slugify from "slugify";

@Entity({name: 'genres'})
export class GenreEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({
        unique: true
    })
    slug: string;
    
    @BeforeInsert()
    @BeforeUpdate()
    generateSlug() {
        if (this.name) {
            this.slug = slugify(this.name, {
                lower: true, 
                strict: true,
                trim: true
            });
        }
    }

    @ManyToMany(() => MangaEntity, (manga) => manga.genres)
    manga: MangaEntity[];
}