import { ApiProperty } from '@nestjs/swagger';
import { BelongsToMany, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from '../users/users.model.js';
import { Role } from './roles.model.js';

@Table({ tableName: 'user_roles', createdAt: false, updatedAt: false })
export class UserRoles extends Model<UserRoles> {
  @ApiProperty({
    example: '1',
    description: 'Unique id',
  })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ApiProperty({
    example: 'Role id',
    description: 'Role id',
  })
  @ForeignKey(() => Role)
  @Column({ type: DataType.INTEGER })
  role_id: number;

  @ApiProperty({
    example: 'User id',
    description: 'User id',
  })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  user_id: number;
}
