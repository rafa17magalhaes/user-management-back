import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { IUserRepository } from '../interfaces/user-repository.interface';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  create(dto: CreateUserDto): Promise<UserEntity> {
    return this.userRepository.create(dto);
  }

  findAll(): Promise<UserEntity[]> {
    return this.userRepository.findAll();
  }

  async findOne(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new NotFoundException(`User ${id} not found`);
    return user;
  }

  update(id: number, dto: UpdateUserDto): Promise<UserEntity> {
    return this.userRepository.update(id, dto);
  }

  delete(id: number): Promise<void> {
    return this.userRepository.delete(id);
  }

  // relatório: total de usuários
  count(): Promise<number> {
    return this.userRepository.count();
  }

  // relatório: usuários por mês
  usersByMonth(): Promise<{ month: string; total: number }[]> {
    return this.userRepository.usersByMonth();
  }
}
