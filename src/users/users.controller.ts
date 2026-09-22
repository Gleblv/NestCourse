import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UsersService } from './users.service.js';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model.js';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private userSerivice: UsersService) {}

  @ApiOperation({
    summary: 'Create user',
  })
  @ApiResponse({
    status: 200,
    type: User,
  })
  @Post()
  async create(@Body() userDto: CreateUserDto) {
    return this.userSerivice.createUser(userDto);
  }

  @ApiOperation({
    summary: 'Get all users',
  })
  @ApiResponse({
    status: 200,
    type: [User],
  })
  @Get()
  async getAll() {
    return this.userSerivice.getAllUsers();
  }
}
