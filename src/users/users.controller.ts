import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UsersService } from './users.service.js';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { RolesGuard } from '../auth/roles.guard.js';
import { Roles } from '../auth/roles-auth.decorator.js';

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
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get()
  async getAll() {
    return this.userSerivice.getAllUsers();
  }
}
