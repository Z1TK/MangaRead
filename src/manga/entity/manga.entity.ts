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
    BeforeUpdate,
    OneToMany
} from "typeorm";
import { ReleaseFormat, StatusManga, TypeManga } from "../enum/manga.enum";
import { AuthorEntity } from "src/author/entity/author.entity";
import { PublisherEntity } from "src/publisher/entity/publisher.entity";
import { GenreEntity } from "src/genre/entity/genre.entity";
import { TagEntity } from "src/tag/entity/tag.entity";
import slugify from "slugify";
import { UserEntity } from "src/user/entity/user.entity";
import { CommentEntity } from "src/comment/entity/comment.entity";

@Entity({name: 'manga'})
export class MangaEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    cover: string;

    @Column()
    title: string;

    @Column({
        unique: true
    })
    slug: string;

    @BeforeInsert()
    @BeforeUpdate()
    generateSlug() {
        if (this.title) {
            this.slug = slugify(this.title, {
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
        type: 'text',
        unique: true,
        array: true
    })
    alternative_title: string[];

    @ManyToOne(() => AuthorEntity, (author) => author.manga)
    @JoinColumn({name: 'author_id'})
    author: AuthorEntity;

    @ManyToOne(() => PublisherEntity, (publisher) => publisher.manga)
    @JoinColumn({name: 'publisher_id'})
    publisher: PublisherEntity;

    @ManyToMany(() => UserEntity, (user) => user.manga)
    @JoinTable({
        name: 'user_manga',
        joinColumn: {name: 'manga_id'},
        inverseJoinColumn: {name: 'user_id'}
    })
    users: UserEntity[];
    
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
    release_year: number;

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

    @OneToMany(() => CommentEntity, (comment) => comment.manga)
    comments: CommentEntity[];

    @CreateDateColumn({
        name: 'created_at'
    })
    createdAt: Date;
    
    @UpdateDateColumn({
        name: 'updeated_at'
    })
    updeatedAt: Date;
}