import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoursesModule } from './courses/courses.module';
import { Course } from './model/courses.entity';
import { SessionModule } from './session/session.module';
import { Session } from './model/session.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'P4ssw0rd!',
      database: 'postgres',
      entities: [Course, Session],
      synchronize: false
    }),
    CoursesModule,
    SessionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
