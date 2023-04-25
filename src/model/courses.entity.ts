import { check } from "prettier";
import { Check, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@Check('"hours_duration" > 0')
export class course {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    author: string;

    @Column()
    url: string;

    @Column({ nullable: true })
    hours_duration: number;
}