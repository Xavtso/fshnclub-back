import { Body, Controller, Get, Post } from '@nestjs/common';
import { EventsService } from './events.service';
import { createEventDto } from './dto/createEvent.dto';

@Controller('events')
export class EventsController {

    constructor(private eventService: EventsService) { }
    
    @Get('')
    getEvents() {
        return this.eventService.showEvents();
    }

    @Post('/create')
    createEvent(@Body() dto: createEventDto) {
        return this.eventService.createEvent(dto);
    }

    @Post('/delete')
    deleteEvent(@Body() dto: createEventDto) {
        return this.eventService.deleteEvent(dto);
    }

}
