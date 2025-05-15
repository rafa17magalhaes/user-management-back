import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ description: 'User ID', example: 1 })
  id: number;

  @ApiProperty({ description: 'Full name', example: 'Alice Silva' })
  name: string;

  @ApiProperty({ description: 'Email address', example: 'alice@example.com' })
  email: string;

  @ApiProperty({ description: 'Document number', example: '12345678900' })
  documentNumber: string;

  @ApiProperty({ description: 'Birth date (ISO)',  example: '2000-01-01T00:00:00.000Z' })
  birthDate: Date;

  @ApiProperty({ description: 'Creation timestamp' })
  createdAt: Date;

  @ApiProperty({ description: 'Last update timestamp' })
  updatedAt: Date;
}
