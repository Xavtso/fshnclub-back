import { Module } from '@nestjs/common';
import { VouchersService } from './vouchers.service';
import { VouchersController } from './vouchers.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Vouchers } from './voucher.model';
import { UsersVouchers } from './userVouchers.model';
// import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  providers: [VouchersService],
  controllers: [VouchersController],
  imports: [
    AuthModule,
    CloudinaryModule,
    SequelizeModule.forFeature([Vouchers,UsersVouchers])
  ]
})
export class VouchersModule {}
