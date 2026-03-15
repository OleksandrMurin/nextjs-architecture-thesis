import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}
  async findByUsername(username: string) {
    return this.usersRepo.findOne({
      where: { username },
      select: ['id', 'username', 'passwordHash'],
    });
  }
  async createUser(params: { username: string; passwordHash: string }) {
    const existing = await this.findByUsername(params.username);
    if (existing)
      throw new ConflictException('This username is already existing');
    const newUser = this.usersRepo.create({
      username: params.username,
      passwordHash: params.passwordHash,
    });
    return this.usersRepo.save(newUser);
  }
}
