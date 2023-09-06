import {
  HasOne,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { UsersVouchers } from './userVouchers.model';

interface VoucherCreationsAttrs {
    title: string;
    start_date: Date;
    expire_date: Date;
    image: Buffer;
}

@Table({ tableName: 'vouchers' })
export class Vouchers extends Model<Vouchers, VoucherCreationsAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: new Date(),
  })
  start_date: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  expire_date: Date;

  @Column({
    type: DataType.BLOB,
    allowNull: true,
  })
  image: Buffer;
  
  @HasMany(() => UsersVouchers)
  users: UsersVouchers[];
}
