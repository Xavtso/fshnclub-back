import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Vouchers } from './voucher.model';
import { createVoucherDto } from './dto/createVoucherDto';
import { UsersVouchers } from './userVouchers.model';
import { Op } from 'sequelize';

@Injectable()
export class VouchersService {
  constructor(
    @InjectModel(Vouchers) private vouchersModel: typeof Vouchers,
    @InjectModel(UsersVouchers) private uservouchersModel: typeof UsersVouchers,
  ) {}

  async createVoucherAndAssignToUsers(dto: createVoucherDto) {
    const voucher = await this.vouchersModel.create(dto);

    // Прив'язати ваучер до вказаних користувачів
    for (const userId of dto.userIds) {
      await this.uservouchersModel.create({
        userId,
        voucherId: voucher.id,
        ifUsed: false,
      });
    }
    return 'Vouchers Created Successfull';
  }

  async deleteExpiredVouchers() {
    const currentDate = new Date();

    // Знайти всі ваучери, чий час дії минув
    const expiredVouchers = await this.vouchersModel.findAll({
      where: {
        expire_date: { [Op.lte]: currentDate },
      },
    });

    // Видалити ваучери та їхні прив'язки до користувачів
    for (const voucher of expiredVouchers) {
      await this.uservouchersModel.destroy({
        where: { voucherId: voucher.id },
      });
      await voucher.destroy();
    }

    return 'Vouchers Successfull Deleted';
  }

    async markVoucherAsUsed(dto: createVoucherDto) {
        const voucherId = dto.id;
        const userId = dto.user_id;

    const userVoucher = await this.uservouchersModel.findOne({
      where: { voucherId, userId },
    });

    if (userVoucher) {
      userVoucher.ifUsed = true;
      await userVoucher.save();
    }
    return 'Voucher Successfull Used';
  }

  async deleteVoucher(dto: createVoucherDto) {
    const vouchers = await this.uservouchersModel.findAll({
      where: { voucherId: dto.id },
    });
    // Видалити ваучери та їхні прив'язки до користувачів
    for (const voucher of vouchers) {
      await this.uservouchersModel.destroy({
        where: { voucherId: voucher.id },
      });
      await this.vouchersModel.destroy({ where: { id: dto.id } });
    }

    return 'Vouchers Successfull Deleted';
  }

  async showAllVouchers() {
    const usersVouchers = await this.vouchersModel.findAll();
    return usersVouchers;
  }

  async showCustomerVouchers(id: number) {
    const userVouchers = await this.uservouchersModel.findAll({
      where: { id },
    });
    return userVouchers;
  }
}
