import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { createUserDto } from 'src/users/dto/createUser.dto';
import { User } from 'src/users/users.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: createUserDto) {
    const user = await this.validateUser(userDto);
    const token = this.generateToken(user);
    return token;
  }

  private async generateToken(user: User) {
    const payload = {
      id: user.id,
      name: user.name,
      birthDate: user.birthDate,
      role: user.role,
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: createUserDto) {
    const user = await this.userService.findUserByPhoneNumber(userDto);

    if (!user) {
      throw new UnauthorizedException('Customer was not found');
    }
    const phoneEquals = await bcrypt.compare(userDto.phone, user.phoneNumber);

    if (user && phoneEquals) {
      return user;
    }

    if (!phoneEquals) {
      throw new UnauthorizedException('Wrong phone number');
    }
  }
}
