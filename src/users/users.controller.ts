import { Controller,Get,Post,Body,Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDto } from './dto/createUser.dto';

@Controller('users')
export class UsersController {

constructor(private userService: UsersService){}

    @Get('/')
    getUsers() {
        return this.userService.showUsers();
    };

    @Post('/register')
    sendToOrder(@Body() dto: createUserDto) {
        return this.userService.sendToOrder(dto);
    }

    @Get('/candidates')
    getCandidates() {
        return this.userService.showCandidates();
    }

    @Post('/approve')
    approveCandidate(@Body() dto:createUserDto) {
        return this.userService.approveCandidate(dto);
    }

    @Post('/edit')
    editUserInfo(@Body() dto: createUserDto) {
        return this.userService.updateOrChangeInfo(dto);
    }

    @Post('/decline')
    declineCandidate(@Body() dto: createUserDto) {
        return this.userService.declineCandidate(dto)
    }

    @Post('/role')
    giveTheRole(@Body() dto: createUserDto) {
        return this.userService.giveRoleToUser(dto)
    }

    @Post('/find/roles')
    getUsersByRole(@Body() dto: createUserDto) {
        return this.userService.findUsersByRole(dto.role)
    }

    @Post('/delete')
    deleteUser(@Body() dto: createUserDto) {
        return this.userService.deleteUser(dto)
    }


}
