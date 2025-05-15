import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Inject,
} from '@nestjs/common';
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

  async create(dto: CreateUserDto): Promise<UserEntity> {
    // Validações de unicidade
    if (await this.userRepository.findByEmail(dto.email)) {
      throw new BadRequestException('E-mail já está em uso');
    } 
    if (await this.userRepository.findByName(dto.name)) {
      throw new BadRequestException('Nome de usuário já existe');
    }
    // prossegue com criação
    return this.userRepository.create(dto);
  }

  findAll(): Promise<UserEntity[]> {
    return this.userRepository.findAll();
  }

  async findOne(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new NotFoundException(`Usuário ${id} não encontrado`);
    return user;
  }

  async update(id: number, dto: UpdateUserDto): Promise<UserEntity> {
    // Se quiser validar também no update:
    if (dto.email) {
      const byEmail = await this.userRepository.findByEmail(dto.email);
      if (byEmail && byEmail.id !== id) {
        throw new BadRequestException('E-mail já está em uso por outro usuário');
      }
    }
    if (dto.name) {
      const byName = await this.userRepository.findByName(dto.name);
      if (byName && byName.id !== id) {
        throw new BadRequestException('Nome já está em uso por outro usuário');
      }
    }
    return this.userRepository.update(id, dto);
  }

  delete(id: number): Promise<void> {
    return this.userRepository.delete(id);
  }

  count(): Promise<number> {
    return this.userRepository.count();
  }

  usersByMonth(): Promise<{ month: string; total: number }[]> {
    return this.userRepository.usersByMonth();
  }
}
