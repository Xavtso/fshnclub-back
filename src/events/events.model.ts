import {
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';


interface EventsCreationsAttrs {
  title: string;
  start_date: Date;
  expire_date: Date;
  image: string;
}

@Table({ tableName: 'events' })
export class Events extends Model<Events, EventsCreationsAttrs> {
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
    type: DataType.STRING,
    allowNull: true,
  })
  image: string;


}
