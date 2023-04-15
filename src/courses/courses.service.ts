import { HttpException, Injectable } from '@nestjs/common';
import { COURSES } from './courses.mock';
import { Http2ServerRequest } from 'http2';
import { resolve } from 'path';

@Injectable()
export class CoursesService {
    courses = COURSES;

    getCourses(): Promise<any> {
        return new Promise(resolv => {
            resolv(this.courses);
        })
    }

    getCourse(courseId): Promise<any> {
        let id = Number(courseId);
        return new Promise(resolv => {
            const course = this.courses.find(course => course.id === id);
            if (!course) {
                throw new HttpException('Course does not exist', 404)
            }
            resolv(course);
        })
    }

    addCourse(course): Promise<any> {
        return new Promise(resolv => {
            this.courses.push(course);
            resolv(this.courses);
        })
    }

    deleteCourse(courseId): Promise<any> {
        let id = Number(courseId);
        return new Promise(resolv => {
            let index = this.courses.findIndex(course => course.id === id);
            if (index === -1) {
                throw new HttpException('Course does not exist', 404);
            } else {
                resolv(JSON.stringify(this.courses.splice(index,1)));
            }
        })
    }
}
