import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserDto } from '../dtos/user.dto';
import {
  ApiTags,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'User created', type: UserDto })
  create(@Body() dto: CreateUserDto): Promise<UserDto> {
    return this.usersService.create(dto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'List all users', type: [UserDto] })
  findAll(): Promise<UserDto[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 200, description: 'Get user by id', type: UserDto })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<UserDto> {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 200, description: 'User updated', type: UserDto })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserDto,
  ): Promise<UserDto> {
    return this.usersService.update(id, dto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 204, description: 'User deleted' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.usersService.delete(id);
  }

  // Relatórios

  @Get('reports/count')
  @ApiResponse({
    status: 200,
    description: 'Total number of users',
    schema: { example: { total: 42 } },
  })
  async getCount(): Promise<{ total: number }> {
    const total = await this.usersService.count();
    return { total };
  }

  @Get('reports/by-month')
  @ApiResponse({
    status: 200,
    description: 'Users grouped by creation month',
  })
  async getByMonth(): Promise<{ month: string; total: number }[]> {
    return this.usersService.usersByMonth();
  }
}
