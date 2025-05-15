import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserEntity } from '../entities/user.entity';

export interface IUserRepository {
  create(data: CreateUserDto): Promise<UserEntity>;
  findAll(): Promise<UserEntity[]>;
  findById(id: number): Promise<UserEntity | null>;
  update(id: number, data: UpdateUserDto): Promise<UserEntity>;
  delete(id: number): Promise<void>;
  //  métodos de relatório
  count(): Promise<number>;
  usersByMonth(): Promise<{ month: string; total: number }[]>;
}
