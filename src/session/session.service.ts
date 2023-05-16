import { Injectable } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { Session } from '../model/session.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MynestjsException } from 'src/mynestjs-exception/mynestjs-exception';

@Injectable()
export class SessionService {
  constructor(@InjectRepository(Session) private readonly sessions: Repository<Session>) {};

  create(createSessionDto: CreateSessionDto): Promise<any> {
    return new Promise(async (resolve, reject) => {
        const entry = await this.sessions.createQueryBuilder()
            .insert()
            .values({
                course: { id: createSessionDto.course },
                facilitator: createSessionDto.facilitator,
                start_datetime: createSessionDto.start_datetime,
                duration: createSessionDto.duration
            })
            .returning(['id'])
            .execute()
            .then((value) => {
                resolve(value.raw);
            })
            .catch((reason) => {
                reject(new MynestjsException("SESS-0001", "Unable to add session"));
            });
    })
}

  findAll() {
    return `This action returns all session`;
  }

  findOne(id: string) {
    return new Promise((resolve) => {
      resolve(this.sessions.findOneBy({
        id: Number(id)
      }))
    });
  }

  update(id: number, updateSessionDto: UpdateSessionDto) {
    return `This action updates a #${id} session`;
  }

  remove(id: number) {
    return `This action removes a #${id} session`;
  }

  findAllbyFacilitator( facilitator: string) {
    return new Promise((resolve, reject) => {
      resolve(this.sessions.find({
        select: {
          start_datetime: true,
          duration: true,
          course: {
            title: true
          }
        },
        relations: {
          course: true
        },
        where: {
          facilitator: facilitator
        }
      }))
    })
  }
}
