import {
  IsNotEmpty,
  IsEmail,
  Length,
  IsDate,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @ApiProperty({ description: 'Full name', example: 'Alice Silva' })
  @IsNotEmpty()
  @Length(2, 100)
  name: string;

  @ApiProperty({ description: 'Email address', example: 'alice@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Password', example: 'secret123' })
  @IsNotEmpty()
  @Length(6, 20)
  password: string;

  @ApiProperty({ description: 'Document number', example: '12345678900' })
  @IsNotEmpty()
  @Length(5, 20)
  documentNumber: string;

  @ApiProperty({ description: 'Birth date (ISO string)', example: '2000-01-01' })
  @IsDate()
  @Type(() => Date)
  birthDate: Date;
}
