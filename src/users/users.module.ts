import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';

import { Order } from 'src/users/order.model';
import { UsersVouchers } from 'src/vouchers/userVouchers.model';
import { AuthModule } from 'src/auth/auth.module';


@Module({

    controllers: [UsersController],
    providers: [UsersService],
    imports: [
        SequelizeModule.forFeature([User, Order, UsersVouchers]),
        forwardRef(() => AuthModule)
    ],
    exports:[UsersService]

})
export class UsersModule {}
