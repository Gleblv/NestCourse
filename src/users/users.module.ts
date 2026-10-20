import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller.js';
import { UsersService } from './users.service.js';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model.js';
import { Role } from '../roles/roles.model.js';
import { UserRoles } from '../roles/user-roles.model.js';
import { RolesModule } from '../roles/roles.module.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User, Role, UserRoles]),
    RolesModule,
    forwardRef(() => AuthModule),
  ],
  exports: [UsersService],
})
export class UsersModule {}
