import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Events } from './events.model';

@Module({
  providers: [EventsService],
  controllers: [EventsController],
  imports: [
    SequelizeModule.forFeature([Events])
  ]
})
export class EventsModule {}
