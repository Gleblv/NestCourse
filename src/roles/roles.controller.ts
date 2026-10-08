import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { RolesService } from './roles.service.js';
import { CreateRoleDto } from './dto/create-role.dto.js';

@Controller('roles')
export class RolesController {
  constructor(private roleService: RolesService) {}

  @Post()
  async create(@Body() dto: CreateRoleDto) {
    return this.roleService.createRole(dto);
  }

  @Get('/:value')
  async getByValue(@Param('value') value: string) {
    return this.roleService.getRoleByValue(value);
  }

  @Delete('/:value')
  async delete(@Param('value') value: string) {
    return this.roleService.deleteRoleByValue(value);
  }
}
