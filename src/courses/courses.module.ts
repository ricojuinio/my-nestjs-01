import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from 'src/model/courses.entity';
import { JwtModule } from '@nestjs/jwt/dist';

@Module({
  imports: [
    TypeOrmModule.forFeature([Course]),
    JwtModule.register({
      global: true
    })
  ],
  controllers: [CoursesController],
  providers: [CoursesService]
})
export class CoursesModule {}
