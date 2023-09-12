import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Events } from './events.model';
import { AuthModule } from 'src/auth/auth.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  providers: [EventsService],
  controllers: [EventsController],
  imports: [
    AuthModule,
    CloudinaryModule,
    SequelizeModule.forFeature([Events])
  ]
})
export class EventsModule {}
