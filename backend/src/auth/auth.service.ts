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

  async login(userName: string, password: string) {
    const user = await this.usersService.findByUsername(userName);
    if (!user) throw new UnauthorizedException('Invalid username');

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) throw new UnauthorizedException('Invalid password');

    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
      userName: user.userName,
    });
    return { accessToken, user: { id: user.id, userName: user.userName } };
  }

  async register(userName: string, password: string) {
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await this.usersService.createUser({ userName, passwordHash });
    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
      userName: user.userName,
    });
    return { accessToken, user: { id: user.id, userName: user.userName } };
  }
}
