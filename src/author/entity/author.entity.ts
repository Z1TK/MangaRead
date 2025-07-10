import { MangaEntity } from "src/manga/entity/manga.entity";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import slugify from "slugify";

@Entity({name: 'authors'})
export class AuthorEntity {
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
    
    @Column({
        unique: true,
        nullable: true,
    })
    pseudonym: string;

    @Column({
        type: 'text',
        nullable: true,
    })
    description: string;

    // change for production
    @Column({
        nullable: true
    })
    image: string;

    @OneToMany(() => MangaEntity, (manga) => manga.author, {
        cascade: true
    })
    manga: MangaEntity[];

    @CreateDateColumn({
        name: 'created_at'
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updeated_at'
    })
    updeatedAt: Date;

}