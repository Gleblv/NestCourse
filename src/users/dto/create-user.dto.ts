import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'example@gmail.com',
    description: 'Unique email',
  })
  @IsString({ message: 'Should be a string' })
  @IsEmail(undefined, { message: 'Not valid email' })
  email: string;

  @ApiProperty({
    example: 'addnwUIU33423aa',
    description: 'User password',
  })
  @IsString({ message: 'Should be a string' })
  @Length(4, 16, { message: 'More than 4 and less than 16 ' })
  readonly password: string;
}
