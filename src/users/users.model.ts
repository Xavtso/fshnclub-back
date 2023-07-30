import {
  HasOne,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';


interface UserCreationsAttrs {
  name: string;
  phoneNumber: string;
    role: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationsAttrs> {
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

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  birthDate: Date;


  @Column({
    type: DataType.STRING,
      allowNull: false,
    defaultValue: 'customer'
  })
  role: string;

  

}
