import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto.js';
import { UsersService } from '../users/users.service.js';
import { JwtService } from '@nestjs/jwt';
import * as bycript from 'bcryptjs';
import { User } from '../users/users.model.js';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: CreateUserDto) {}

  async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email);

    console.log('user dto', userDto);

    if (candidate) {
      throw new HttpException('User with this email already exists', 400);
    }

    const hashPassword = await bycript.hash(userDto.password, 5);

    const user = await this.userService.createUser({ ...userDto, password: hashPassword });

    return this.generateToken(user);
  }

  async generateToken(user: User) {
    console.log('generate roken', user);

    const payload = { email: user.email, id: user.id, roles: user.roles };

    return {
      token: this.jwtService.sign(payload),
    };
  }
}
