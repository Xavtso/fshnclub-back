import { Controller,Get,Post,Body,Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDto } from './dto/createUser.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles-auth.guard';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) { }
    
  @Roles('admin')
  @UseGuards(RolesGuard)
  @Get('/')
  getUsers() {
    return this.userService.showUsers();
  }

  @Post('/register')
  sendToOrder(@Body() dto: createUserDto) {
    return this.userService.sendToOrder(dto);
  }

  @Roles('admin')
  @UseGuards(RolesGuard)
  @Get('/candidates')
  getCandidates() {
    return this.userService.showCandidates();
  }

  @Roles('admin')
  @UseGuards(RolesGuard)
  @Post('/approve')
  approveCandidate(@Body() dto: createUserDto) {
    return this.userService.approveCandidate(dto);
  }

  @Roles('admin')
  @UseGuards(RolesGuard)
  @Post('/edit')
  editUserInfo(@Body() dto: createUserDto) {
    return this.userService.updateOrChangeInfo(dto);
  }

  @Roles('admin')
  @UseGuards(RolesGuard)
  @Post('/decline')
  declineCandidate(@Body() dto: createUserDto) {
    return this.userService.declineCandidate(dto);
  }

  @Post('/role')
  giveTheRole(@Body() dto: createUserDto) {
    return this.userService.giveRoleToUser(dto);
  }

  @Roles('admin')
  @UseGuards(RolesGuard)
  @Post('/find/roles')
  getUsersByRole(@Body() dto: createUserDto) {
    return this.userService.findUsersByRole(dto.role);
  }

  @Roles('admin')
  @UseGuards(RolesGuard)
  @Post('/delete')
  deleteUser(@Body() dto: createUserDto) {
    return this.userService.deleteUser(dto);
  }
}
