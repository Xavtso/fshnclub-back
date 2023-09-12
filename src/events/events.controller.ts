import { Body, Controller, Get, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { EventsService } from './events.service';
import { createEventDto } from './dto/createEvent.dto';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles-auth.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('events')
export class EventsController {
  constructor(private eventService: EventsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('')
  getEvents() {
    return this.eventService.showEvents();
  }

  @Roles('admin')
  @UseGuards(RolesGuard)
  @Post('/create')
  @UseInterceptors(FileInterceptor('file'))
  createEvent(@Body() dto: createEventDto, @UploadedFile() file: Express.Multer.File) {
    return this.eventService.createEvent(dto,file);
  }

  @Roles('admin')
  @UseGuards(RolesGuard)
  @Post('/delete')
  deleteEvent(@Body() dto: createEventDto) {
    return this.eventService.deleteEvent(dto);
  }
}
