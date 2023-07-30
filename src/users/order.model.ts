import {
  HasOne,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';

interface OrderCreationsAttrs {
  name: string;
  phoneNumber: string;
    
}

@Table({ tableName: 'order' })
export class Order extends Model<Order, OrderCreationsAttrs> {
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
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phoneNumber: string;

}
