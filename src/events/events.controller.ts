import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import { createEventDto } from './dto/createEvent.dto';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles-auth.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

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
  createEvent(@Body() dto: createEventDto) {
    return this.eventService.createEvent(dto);
  }

  @Roles('admin')
  @UseGuards(RolesGuard)
  @Post('/delete')
  deleteEvent(@Body() dto: createEventDto) {
    return this.eventService.deleteEvent(dto);
  }
}
