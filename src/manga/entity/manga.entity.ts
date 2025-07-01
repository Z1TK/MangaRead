import { 
    PrimaryGeneratedColumn, 
    Column, 
    ManyToOne, 
    Entity, 
    CreateDateColumn, 
    UpdateDateColumn, 
    ManyToMany, 
    JoinTable, 
    JoinColumn, 
    BeforeInsert,
    BeforeUpdate
} from "typeorm";
import { ReleaseFormat, StatusManga, TypeManga } from "../enum/manga.enum";
import { AuthorEntity } from "src/author/entity/author.entity";
import { PublisherEntity } from "src/publisher/entity/publisher.entity";
import { GenreEntity } from "src/genre/entity/genre.entity";
import { TagEntity } from "src/tag/entity/tag.entity";
import slugify from "slugify";

@Entity({name: 'manga'})
export class MangaEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    cover: string;

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
        type: 'text'
    })
    description: string;

    @Column({
        unique: true,
        array: true
    })
    alternative_name: string[];

    @ManyToOne(() => AuthorEntity, (author) => author.manga)
    @JoinColumn({name: 'author_id'})
    author: AuthorEntity;

    @ManyToOne(() => PublisherEntity, (publisher) => publisher.manga)
    @JoinColumn({name: 'publisher_id'})
    publisher: PublisherEntity;
    
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
        type: 'int',
        unsigned: true
    })
    release_yaer: number;

    @Column({
        type: 'enum',
        enum: ReleaseFormat,
        array: true
    })
    release_format: ReleaseFormat[];

    @ManyToMany(() => GenreEntity, (genre) => genre.manga)
    @JoinTable({
        name: 'manga_genres',
        joinColumn: {name: 'manga_id'},
        inverseJoinColumn: {name: 'genre_id'}
    })
    genres: GenreEntity[];

    @ManyToMany(() => TagEntity, (tag) => tag.manga)
    @JoinTable({
        name: 'manga_tags',
        joinColumn: {name: 'manga_id'},
        inverseJoinColumn: {name: 'tag_id'}
    })
    tags: TagEntity[];

    @CreateDateColumn({
        name: 'created_at'
    })
    createdAt: Date;
    
    @UpdateDateColumn({
        name: 'updeated_at'
    })
    updeatedAt: Date;
}