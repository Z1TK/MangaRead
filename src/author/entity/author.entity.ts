import { MangaEntity } from "src/manga/entity/manga.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'authors'})
export class AuthorEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        unique: true,
    })
    name: string;
    
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

    @OneToMany(() => MangaEntity, (manga) => manga.author)
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