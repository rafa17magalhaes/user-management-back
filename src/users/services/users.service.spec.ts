import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserEntity } from '../entities/user.entity';

describe('UsersService', () => {
  let service: UsersService;
  let repo: any;

  beforeEach(async () => {
    repo = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: 'IUserRepository',
          useValue: repo,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should create a user', async () => {
    const dto: CreateUserDto = {
      name: 'Alice',
      email: 'alice@example.com',
      password: 'pass123',
      documentNumber: '123456',
      birthDate: new Date('2000-01-01'),
    };
    const user = { id: 1, ...dto } as UserEntity;
    repo.create.mockResolvedValue(user);

    await expect(service.create(dto)).resolves.toBe(user);
    expect(repo.create).toHaveBeenCalledWith(dto);
  });

  it('should return all users', async () => {
    const list: UserEntity[] = [];
    repo.findAll.mockResolvedValue(list);

    await expect(service.findAll()).resolves.toBe(list);
    expect(repo.findAll).toHaveBeenCalled();
  });

  it('should return one user if exists', async () => {
    const user = { id: 1 } as UserEntity;
    repo.findById.mockResolvedValue(user);

    await expect(service.findOne(1)).resolves.toBe(user);
    expect(repo.findById).toHaveBeenCalledWith(1);
  });

  it('should throw if user not found', async () => {
    repo.findById.mockResolvedValue(null);

    await expect(service.findOne(123)).rejects.toThrow(NotFoundException);
    expect(repo.findById).toHaveBeenCalledWith(123);
  });

  it('should update a user', async () => {
    const dto: UpdateUserDto = { name: 'Bob' };
    const updated = { id: 1, name: 'Bob' } as UserEntity;
    repo.update.mockResolvedValue(updated);

    await expect(service.update(1, dto)).resolves.toBe(updated);
    expect(repo.update).toHaveBeenCalledWith(1, dto);
  });

  it('should delete a user', async () => {
    repo.delete.mockResolvedValue(undefined);
    await expect(service.delete(1)).resolves.toBeUndefined();
    expect(repo.delete).toHaveBeenCalledWith(1);
  });
});
