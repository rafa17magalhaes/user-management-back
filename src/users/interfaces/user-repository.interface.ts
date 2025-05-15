import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserEntity } from '../entities/user.entity';

export interface IUserRepository {
  create(data: CreateUserDto): Promise<UserEntity>;
  findAll(): Promise<UserEntity[]>;
  findById(id: number): Promise<UserEntity | null>;
  update(id: number, data: UpdateUserDto): Promise<UserEntity>;
  delete(id: number): Promise<void>;
  findByEmail(email: string): Promise<UserEntity | null>;
  findByName(name: string): Promise<UserEntity | null>;
  //  métodos para relatório
  count(): Promise<number>;
  usersByMonth(): Promise<{ month: string; total: number }[]>;
}
