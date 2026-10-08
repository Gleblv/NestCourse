import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto.js';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './roles.model.js';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

  async createRole(dto: CreateRoleDto) {
    const role = await this.roleRepository.create(dto);

    return role;
  }

  async getRoleByValue(value: string) {
    const role = await this.roleRepository.findOne({ where: { value } });

    return role;
  }

  async deleteRoleByValue(value: string) {
    return await this.roleRepository.destroy({ where: { value } });
  }
}
