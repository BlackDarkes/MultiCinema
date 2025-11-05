import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UsersEntity } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: Repository<UsersEntity>,
  ) {}

  async getByEmail(email: string): Promise<UsersEntity | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async getById(id: string): Promise<UsersEntity | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async create(user: Partial<UsersEntity>) {
    const newUser = this.userRepository.create(user);
    const saveUsers = this.userRepository.save(newUser);

    return saveUsers;
  }
}
