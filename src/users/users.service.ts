import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { createUserDto } from './dto/createUser.dto';
import { Order } from './order.model';



@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userModel: typeof User,
    @InjectModel(Order) private orderModel: typeof Order) { }
    
    async createUser(candidate: Order) {
        const user = await this.userModel.create(candidate);
        return user;
    }

    async sendToOrder(userDto: createUserDto) {
        await this.orderModel.create(userDto);
        return 'Thanks. Wait for admin approve now !)'
    }

    async showCandidates() {
        const candidates = this.orderModel.findAll();
        return candidates;
    }

    async approveCandidate(userDto: createUserDto) {
        const candidate = await this.orderModel.findByPk(userDto.id);
        const createdUser = await this.createUser(candidate);
        
        await this.updateOrChangeInfo(userDto,createdUser);
        return 'User Created';
    };

    async updateOrChangeInfo(userDto:createUserDto, user?: User,) {
        if (user) {
            await user.update({ ...userDto });
        }
        const customer = await this.userModel.findByPk(userDto.id);
        await customer.update({...userDto})

        return 'User Info Updated';
    }

    async declineCandidate(userDto: createUserDto) {
        const candidate = await this.orderModel.findByPk(userDto.id);
        await candidate.destroy();
        return 'User was deleted'
    }

    async showUsers() {
        return await this.userModel.findAll();
    }



}
