import { Body, Controller, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { VouchersService } from './vouchers.service';
import { createVoucherDto } from './dto/createVoucherDto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('vouchers')
export class VouchersController {
  constructor(private vouchersService: VouchersService) {}

  @Post('/create')
  @Roles('admin')
  @UseGuards(RolesGuard)
  @UseInterceptors(FileInterceptor('image'))
  createVoucher(
    @Body() dto: createVoucherDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(file);
    return this.vouchersService.createVoucherAndAssignToUsers(dto,file.buffer);
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

  @Roles('admin')
  @UseGuards(RolesGuard)
  @Post('/upload/image')
  @UseInterceptors(FileInterceptor('image'))
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    console.log(file.buffer);
  }
}
