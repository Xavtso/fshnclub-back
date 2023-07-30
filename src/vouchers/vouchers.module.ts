import { Module } from '@nestjs/common';
import { VouchersService } from './vouchers.service';
import { VouchersController } from './vouchers.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Vouchers } from './voucher.model';
import { UsersVouchers } from './userVouchers.model';

@Module({
  providers: [VouchersService],
  controllers: [VouchersController],
  imports: [
    SequelizeModule.forFeature([Vouchers,UsersVouchers])
  ]
})
export class VouchersModule {}
