import { 
    Controller, 
    Delete, 
    Get, 
    Post, 
    Param, 
    Query, 
    Body, 
    HttpException, 
    HttpStatus, 
    Logger,
    UseGuards} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './create-course.dto';
import { IsAuthenticatedGuard } from 'src/is-authenticated/is-authenticated.guard';

@Controller('courses')
export class CoursesController {
    constructor(private coursesService: CoursesService) {};
    private readonly logger = new Logger(CoursesService.name);

    @Get()
    async getCourses() {
        const courses = await this.coursesService.getCourses();
        return courses;
    }

    @Get(':courseId')
    async getCourse(@Param('courseId') courseId) {
        const course = await this.coursesService.getCourse(courseId).catch(
            (reason) => {
                throw new HttpException(reason.message, HttpStatus.NOT_FOUND);
            });
        return course;
    }

    @UseGuards(IsAuthenticatedGuard)
    @Post()
    async addCourse(@Body() createCourseDto: CreateCourseDto) {
        if (Object.keys(createCourseDto).length == 0) {
            throw new HttpException('Unable to parse request', HttpStatus.BAD_REQUEST);
        }
        const course = await this.coursesService.addCourse(createCourseDto).catch(
            (reason) => {
                throw new HttpException(reason.message, HttpStatus.BAD_REQUEST)
            }
        );
        return course;
    }

    @UseGuards(IsAuthenticatedGuard)
    @Delete()
    async deleteCourse(@Query('id') courseId: string) {
        const course = await this.coursesService.deleteCourse(courseId).catch(
            (reason) => {
                throw new HttpException(reason.message, HttpStatus.NOT_FOUND)
            });
        return course;
    }

}
