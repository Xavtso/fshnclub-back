import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Events } from './events.model';
import { createEventDto } from './dto/createEvent.dto';
import { Op } from 'sequelize';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class EventsService {
  constructor(@InjectModel(Events) private eventsModel: typeof Events) {}

  async createEvent(dto: createEventDto) {
    await this.eventsModel.create(dto);
    return 'Event Created Successfull';
  }

  async deleteEvent(dto: createEventDto) {
    const event = await this.eventsModel.findByPk(dto.id);
    await event.destroy();
    return 'Event deleted';
  }
  @Cron(CronExpression.EVERY_6_HOURS)
  async deleteExpiredEvents() {
    const currentDate = new Date();

    const expiredEvents = await this.eventsModel.findAll({
      where: {
        expire_date: { [Op.lte]: currentDate },
      },
    });

    for (const event of expiredEvents) {
      await this.eventsModel.destroy({ where: { id: event.id } });
    }

    return 'Events Successfull Deleted';
  }

  async showEvents() {
    const events = await this.eventsModel.findAll();
    return events;
  }
}
