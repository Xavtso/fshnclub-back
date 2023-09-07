import { Body, Controller, Param, Post,Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { createUserDto } from 'src/users/dto/createUser.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }
    @Post('/login')
    signIn(@Body() dto: createUserDto) {
        return this.authService.login(dto);
    }

    @Get('/:id')
    autoLogin(@Param('id') id: number) {
        return this.authService.autoLogin(id)
    }

}
