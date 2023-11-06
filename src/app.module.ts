import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { User } from './users/users.model';
import { Order } from './users/order.model';
import { VouchersModule } from './vouchers/vouchers.module';
import { Vouchers } from './vouchers/voucher.model';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersVouchers } from './vouchers/userVouchers.model';
import { EventsModule } from './events/events.module';
import { Events } from './events/events.model';
import { AuthModule } from './auth/auth.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CloudinaryModule } from './cloudinary/cloudinary.module';


@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
   
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => ({ 
        dialect: 'mysql',

        host: process.env.HOST,
        port: 3306,
        username: process.env.DB_USERNAME,
        password: process.env.PASSWORD,
        database: process.env.DB,
        autoLoadModels: true,
        models: [User, Order, Vouchers,UsersVouchers,Events],
      }),
    }),
    UsersModule,
    VouchersModule,
    EventsModule,
    AuthModule,
    CloudinaryModule,
  ],
  exports:[AuthModule]
})
export class AppModule {}
