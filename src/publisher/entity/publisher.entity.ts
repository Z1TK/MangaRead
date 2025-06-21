import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'publishers'})
export class PublisherEntity {
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
    anothor_name: string;

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

    @CreateDateColumn({
        name: 'created_at'
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updeated_at'
    })
    updeatedAt: Date;

}