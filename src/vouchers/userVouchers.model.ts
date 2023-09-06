import {
  HasOne,
  Column,
  DataType,
    HasMany,
  BelongsTo,
  Model,
  Table,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from 'src/users/users.model';
import { Vouchers } from './voucher.model';

// interface VoucherCreationsAttrs {
//   title: string;
//   start_date: Date;
//   expire_date: Date;
//   image: string;
// }

// users-vouchers.model.ts

@Table({ tableName: 'users_vouchers' })
export class UsersVouchers extends Model<UsersVouchers> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;
  
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @ForeignKey(() => Vouchers)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  voucherId: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  })
  ifUsed: boolean;
  
  @Column({
    type: DataType.BLOB,
    allowNull: true,
  })
  image: Buffer;


  // Зв'язок багато до одного між UsersVouchers та User
  @BelongsTo(() => User)
  user: User;

  // Зв'язок багато до одного між UsersVouchers та Vouchers
  @BelongsTo(() => Vouchers)
  voucher: Vouchers;
}

