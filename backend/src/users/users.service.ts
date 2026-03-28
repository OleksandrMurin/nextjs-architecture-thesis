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
  async findByUsername(userName: string) {
    return this.usersRepo.findOne({
      where: { userName },
      select: ['id', 'userName', 'passwordHash'],
    });
  }
  async createUser(params: { userName: string; passwordHash: string }) {
    const existing = await this.findByUsername(params.userName);
    if (existing)
      throw new ConflictException('This username is already existing');
    const newUser = this.usersRepo.create({
      userName: params.userName,
      passwordHash: params.passwordHash,
    });
    return this.usersRepo.save(newUser);
  }
}
