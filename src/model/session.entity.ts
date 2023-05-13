import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Course } from '../model/courses.entity';

@Entity()
export class Session {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    facilitator: string;

    @Column("timestamp with time zone")
    start_datetime: Date;

    @Column("interval")
    duration: number;

    @ManyToOne(() => Course)
    @JoinColumn({ name: 'course_id' })
    course: Course;
}
