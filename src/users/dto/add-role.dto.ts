import { ApiProperty } from '@nestjs/swagger';

export class AddRoleDto {
  @ApiProperty({
    example: 'USER',
    description: 'Role value',
  })
  readonly value: string;
  @ApiProperty({
    example: '1',
    description: 'User id',
  })
  readonly userId: number;
}
