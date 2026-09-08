import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UsersService } from './users.service.js';

@Controller('users')
export class UsersController {
  constructor(private userSerivice: UsersService) {}

  @Post()
  async create(@Body() userDto: CreateUserDto) {
    return this.userSerivice.createUser(userDto);
  }

  @Get()
  async getAll() {
    return this.userSerivice.getAllUsers();
  }
}
