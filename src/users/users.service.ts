import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { createUserDto } from './dto/createUser.dto';
import { Order } from './order.model';
import { TwilioService } from 'nestjs-twilio/dist/module';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(Order) private orderModel: typeof Order,
    private readonly twilioService: TwilioService,
  ) {}

  async createUser(candidate: Order) {
    console.log(candidate);
    const user = await this.userModel.create(candidate);
    this.sendSMS(user);
    return user;
  }

  async sendSMS(user:User) {
    return this.twilioService.client.messages.create({
      body: `
        Hello! \n 
    We are pleased to inform you that your application for membership in our club has been accepted.
    You can now log in to your account. \n 
       
      Here is your unique link:
      https://fshnclub.vercel.app/${user.id}

      Or enter you name and number to the form!

    Best regards! You FSHN Club
            `,
      from: '+12515807858',
      to: user.phoneNumber,
    });
  }
  async sendToOrder(userDto: createUserDto) {
 

    await this.orderModel.create(userDto);
    return 'Thanks. Wait for admin approve now !)';
  }

  async showCandidates() {
    const candidates = this.orderModel.findAll();
    return candidates;
  }

  async approveCandidate(userDto: createUserDto) {
    const candidate = await this.orderModel.findByPk(userDto.id);
    // console.log(candidate);
    const createdUser = await this.createUser(candidate.dataValues);
    await candidate.destroy();
    await this.updateOrChangeInfo(userDto, createdUser);
    return 'User Created';
  }

  async updateOrChangeInfo(userDto: createUserDto, user?: User) {
    if (user) {
      await user.update({ ...userDto });
    }
    const customer = await this.userModel.findByPk(userDto.id);
    await customer.update({ ...userDto });

    return 'User Info Updated';
  }

  async declineCandidate(userDto: createUserDto) {
    const candidate = await this.orderModel.findByPk(userDto.id);
    await candidate.destroy();
    return 'User was deleted';
  }

  async showUsers() {
    return await this.userModel.findAll();
  }

  async findUserByPhoneNumber(dto: createUserDto) {
    const user = await this.userModel.findOne({
      where: { phoneNumber: dto.phoneNumber },
    });
    return user;
  }

  async giveRoleToUser(dto: createUserDto) {
    const candidate = await this.userModel.update(
      { role: dto.role },
      { where: { id: dto.id } },
    );
    return `Role Changed`;
  }

  async findUsersByRole(role: string) {
    const users = await this.userModel.findAll({ where: { role } });
    return users;
  }

  async checkCandidate(dto: createUserDto) {
    const candidate = this.orderModel.findOne({
      where: { phoneNumber: dto.phoneNumber },
    });
    return candidate;
  }
  async deleteUser(dto: createUserDto) {
    const user = await this.userModel.findByPk(dto.id);
    await user.destroy();
    return 'User Deleted!';
  }
  async findUserById(id: number) {
    const user = this.userModel.findByPk(id)
    return user;
  }
}
