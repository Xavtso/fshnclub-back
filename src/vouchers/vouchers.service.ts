import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Vouchers } from './voucher.model';
import { createVoucherDto } from './dto/createVoucherDto';

@Injectable()
export class VouchersService {
    constructor(@InjectModel(Vouchers) private vouchersModel: typeof Vouchers) { }
    
    async createVoucher(dto: createVoucherDto) {
        await this.vouchersModel.create(dto);
    }

}
