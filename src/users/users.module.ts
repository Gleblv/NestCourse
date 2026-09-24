import { Module } from '@nestjs/common';
import { UsersController } from './users.controller.js';
import { UsersService } from './users.service.js';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model.js';
import { Role } from '../roles/roles.model.js';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [SequelizeModule.forFeature([User, Role])],
})
export class UsersModule {}
