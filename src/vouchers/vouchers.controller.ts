import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { VouchersService } from './vouchers.service';
import { createVoucherDto } from './dto/createVoucherDto';

@Controller('vouchers')
export class VouchersController {
  constructor(private vouchersService: VouchersService) {}

  @Post('/create')
  createVoucher(@Body() dto: createVoucherDto) {
    return this.vouchersService.createVoucherAndAssignToUsers(dto);
  }

  @Get('/all')
  getAllVouchers() {
    return this.vouchersService.showAllVouchers();
  }
  @Get('/:id')
  getUserVouchers(@Param('id') id: number) {
    return this.vouchersService.showCustomerVouchers(id);
  }

  @Post('/use')
  useVoucher(@Body() dto: createVoucherDto) {
    return this.vouchersService.markVoucherAsUsed(dto);
  }

  @Post('/delete')
  deleteVoucher(@Body() dto: createVoucherDto) {
    return this.vouchersService.deleteVoucher(dto);
  }
}
