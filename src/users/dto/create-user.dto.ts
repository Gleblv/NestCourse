import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'example@gmail.com',
    description: 'Unique email',
  })
  readonly email: string;

  @ApiProperty({
    example: 'addnwUIU33423aa',
    description: 'User password',
  })
  readonly password: string;
}
