import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUserRepository } from '../interfaces/user-repository.interface';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repo: Repository<UserEntity>,
  ) {}

  create(data: CreateUserDto): Promise<UserEntity> {
    const user = this.repo.create(data);
    return this.repo.save(user);
  }

  findAll(): Promise<UserEntity[]> {
    return this.repo.find();
  }

  findById(id: number): Promise<UserEntity | null> {
    return this.repo.findOne({ where: { id } });
  }

  findByEmail(email: string): Promise<UserEntity | null> {
    return this.repo.findOne({ where: { email } });
  }

  findByName(name: string): Promise<UserEntity | null> {
    return this.repo.findOne({ where: { name } });
  }

  async update(id: number, data: UpdateUserDto): Promise<UserEntity> {
    await this.repo.update(id, data);
    // reload to return the updated entity without overwriting missing fields
    return this.findById(id) as Promise<UserEntity>;
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }

  // relatório: total de usuários
  count(): Promise<number> {
    return this.repo.count();
  }

  // relatório: usuários agrupados por mês de criação
  usersByMonth(): Promise<{ month: string; total: number }[]> {
    return this.repo
      .createQueryBuilder('u')
      .select("TO_CHAR(u.createdAt, 'YYYY-MM')", 'month')
      .addSelect('COUNT(*)', 'total')
      .groupBy('month')
      .orderBy('month')
      .getRawMany();
  }
}
