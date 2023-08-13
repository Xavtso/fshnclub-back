import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { VouchersService } from './vouchers.service';
import { createVoucherDto } from './dto/createVoucherDto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles-auth.guard';

@Controller('vouchers')
export class VouchersController {
  constructor(private vouchersService: VouchersService) {}

  @Roles('admin')
  @UseGuards(RolesGuard)
  @Post('/create')
  createVoucher(@Body() dto: createVoucherDto) {
    return this.vouchersService.createVoucherAndAssignToUsers(dto);
  }

  @Roles('admin')
  @UseGuards(RolesGuard)
  @Get('/all')
  getAllVouchers() {
    return this.vouchersService.showAllVouchers();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  getUserVouchers(@Param('id') id: number) {
    return this.vouchersService.showCustomerVouchers(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/use')
  useVoucher(@Body() dto: createVoucherDto) {
    return this.vouchersService.markVoucherAsUsed(dto);
  }

  @Roles('admin')
  @UseGuards(RolesGuard)
  @Post('/delete')
  deleteVoucher(@Body() dto: createVoucherDto) {
    return this.vouchersService.deleteVoucher(dto);
  }
}
