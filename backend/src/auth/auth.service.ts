import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async login(username: string, password: string) {
    const user = await this.usersService.findByUsername(username);
    if (!user) throw new UnauthorizedException('Invalid username');

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) throw new UnauthorizedException('Invalid password');

    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
      username: user.username,
    });
    return { accessToken, user: { id: user.id, username: user.username } };
  }

  async register(username: string, password: string) {
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await this.usersService.createUser({ username, passwordHash });
    return { id: user.id, username: user.username };
  }
}
