import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserEntity } from '../entities/user.entity';

describe('UsersController', () => {
  let controller: UsersController;
  let service: any;

  beforeEach(async () => {
    service = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: service,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should create a user', async () => {
    const dto: CreateUserDto = {
      name: 'Alice',
      email: 'alice@example.com',
      password: 'pass123',
      documentNumber: '123456',
      birthDate: new Date('2000-01-01'),
    };
    const result = new UserEntity();
    Object.assign(result, { id: 1, ...dto, createdAt: new Date(), updatedAt: new Date() });

    service.create.mockResolvedValue(result);

    expect(await controller.create(dto)).toBe(result);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should return all users', async () => {
    const users: UserEntity[] = [];
    service.findAll.mockResolvedValue(users);

    expect(await controller.findAll()).toBe(users);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return a single user', async () => {
    const user = { id: 1 } as UserEntity;
    service.findOne.mockResolvedValue(user);

    expect(await controller.findOne(1 as any)).toBe(user);
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it('should update a user', async () => {
    const dto: UpdateUserDto = { name: 'Bob' };
    const updated = { id: 1, name: 'Bob' } as UserEntity;
    service.update.mockResolvedValue(updated);

    expect(await controller.update(1 as any, dto)).toBe(updated);
    expect(service.update).toHaveBeenCalledWith(1, dto);
  });

  it('should delete a user', async () => {
    service.delete.mockResolvedValue(undefined);

    await expect(controller.remove(1 as any)).resolves.toBeUndefined();
    expect(service.delete).toHaveBeenCalledWith(1);
  });
});
