import { 
  Controller, 
  Get, 
  HttpException, 
  HttpStatus, 
  Param, 
  Post, 
  Query, 
  RawBodyRequest, 
  Req 
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Query('accessKey') accessKey: string): string {
    if (accessKey.toLowerCase() === 'rico') {
      return this.appService.getHello();
    } else {      
      throw new HttpException("You are not allowed here", HttpStatus.FORBIDDEN);
    }
  }

  @Post()
  echoRequest(@Req() req: RawBodyRequest<Request>) {
    return req.body;
  }

}
