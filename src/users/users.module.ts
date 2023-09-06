import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';

import { Order } from 'src/users/order.model';
import { UsersVouchers } from 'src/vouchers/userVouchers.model';
import { AuthModule } from 'src/auth/auth.module';
import { TwilioModule,TwilioClient } from 'nestjs-twilio';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    TwilioModule.forRoot({
      accountSid: 'AC340a08ff28e726ac2494dd2df8ca0528',
      authToken: 'f9ee49090b78d09627f0ea47d1a2663f',
    }),

    SequelizeModule.forFeature([User, Order, UsersVouchers]),
    forwardRef(() => AuthModule),
  ],
  exports: [UsersService],
})
export class UsersModule {}
