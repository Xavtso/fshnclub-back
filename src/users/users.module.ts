import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';

import { Order } from 'src/users/order.model';
import { UsersVouchers } from 'src/vouchers/userVouchers.model';
import { AuthModule } from 'src/auth/auth.module';
import { TwilioModule,TwilioClient } from 'nestjs-twilio';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    ConfigModule.forRoot(),
    TwilioModule.forRoot({
      accountSid: process.env.TWILIO_SID,
      authToken: process.env.TWILIO_TOKEN,
    }),

    SequelizeModule.forFeature([User, Order, UsersVouchers]),
    forwardRef(() => AuthModule),
  ],
  exports: [UsersService],
})
export class UsersModule {}
