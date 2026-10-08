import { Module } from '@nestjs/common';
import { RolesService } from './roles.service.js';
import { RolesController } from './roles.controller.js';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from './roles.model.js';
import { User } from '../users/users.model.js';
import { UserRoles } from './user-roles.model.js';

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [SequelizeModule.forFeature([Role, User, UserRoles])],
  exports: [RolesService],
})
export class RolesModule {}
