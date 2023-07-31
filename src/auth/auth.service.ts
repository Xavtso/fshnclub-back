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
        const candidate = await this.checkIfCandidate(userDto);
        if (candidate) {
          return 'You are already in line !'
      }
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
        await this.userService.sendToOrder(userDto);
        throw new UnauthorizedException(
          'Thanks. Wait for admin approve now !)',
        );
    }
      return user;
    }

    private async checkIfCandidate(userDto:createUserDto) {
        const candidate = await this.userService.checkCandidate(userDto);
        return candidate;
        }
    }
    