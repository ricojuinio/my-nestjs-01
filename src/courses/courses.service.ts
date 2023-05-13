import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from '../model/courses.entity'
import { CreateCourseDto } from './create-course.dto';
import { MynestjsException } from 'src/mynestjs-exception/mynestjs-exception';

@Injectable()
export class CoursesService {
    constructor(@InjectRepository(Course) private readonly courses: Repository<Course>) {};

    getCourses(): Promise<any> {
        return new Promise(resolv => {
            resolv(this.courses.find({
                select: { 
                    id: true,
                    title: true,
                    author: true
                }
            }));
        })
    }

    getCourse(courseId): Promise<any> {
        let id = Number(courseId);
        return new Promise(async (resolve, reject) => {
            const course = await this.courses.findBy({
                id: id
            });
            if (course.length) {
                resolve(course);
            } else {
                reject(new MynestjsException("CRSE-0001", `Course ${id} does not exist`))
            }
        })
    }

    addCourse(course: CreateCourseDto): Promise<any> {
        return new Promise(async (resolve, reject) => {
            const entry = await this.courses.createQueryBuilder()
                .insert()
                .values({
                    title: course.title,
                    author: course.author,
                    description: course.description,
                    url: course.url
                })
                .returning(['id', 'title'])
                .execute()
                .then((value) => {
                    resolve(value.raw);
                })
                .catch((reason) => {
                    reject(new MynestjsException("CRSE-0002", "Unable to add course"));
                });
        })
    }

    deleteCourse(courseId): Promise<any> {
        let id = Number(courseId);
        return new Promise(async (resolve, reject) => {
            let index = await this.courses.findOneBy({
                id: id
            });
            if (index == null) {
                reject(new MynestjsException("CRSE-0001", `Course ${id} does not exist`));
            } else {
                resolve(this.courses.remove(index))
            }
        })
    }
}
