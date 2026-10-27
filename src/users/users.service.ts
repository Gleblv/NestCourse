import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { RolesService } from '../roles/roles.service.js';
import { AddRoleDto } from './dto/add-role.dto.js';
import { BanUserDto } from './dto/ban-user.dto.js';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    const role = await this.roleService.getRoleByValue('ADMIN');

    if (role?.id) {
      await user.$set('roles', [role.id]);

      user.roles = [role];
    }

    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({ include: { all: true } });

    return users;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email }, include: { all: true } });

    console.log('get user by email', user);

    return user;
  }

  async addRole(addRoleDto: AddRoleDto) {
    const user = await this.userRepository.findByPk(addRoleDto.userId);
    const role = await this.roleService.getRoleByValue(addRoleDto.value);

    if (user && role) {
      await user.$add('role', role.id);

      return;
    }

    throw new HttpException('User or role not found', HttpStatus.NOT_FOUND);
  }

  async ban(banUserDto: BanUserDto) {
    const user = await this.userRepository.findByPk(banUserDto.userId);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    user.banned = true;
    user.banReason = banUserDto.banReason;

    await user.save();

    return user;
  }
}
