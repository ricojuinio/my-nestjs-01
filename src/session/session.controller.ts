import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { SessionService } from './session.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { IsAuthenticatedGuard } from 'src/is-authenticated/is-authenticated.guard';

@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @UseGuards(IsAuthenticatedGuard)
  @Post()
  create(@Body() createSessionDto: CreateSessionDto) {
    return this.sessionService.create(createSessionDto);
  }

  @Get()
  findAll() {
    return this.sessionService.findAll();
  }

  @Get('facilitator')
  findAllByfacilitator(@Query('name') name: string) {
    return this.sessionService.findAllbyFacilitator(name);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sessionService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSessionDto: UpdateSessionDto) {
    return this.sessionService.update(+id, updateSessionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sessionService.remove(+id);
  }
}
