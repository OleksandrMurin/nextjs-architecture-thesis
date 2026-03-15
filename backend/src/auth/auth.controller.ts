import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login and receive JWT token' })
  @ApiResponse({ status: 200, description: 'Returns access token' })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto.username, dto.password);
  }
  @ApiOperation({ summary: 'Register new account' })
  @ApiResponse({
    status: 200,
    description: 'Successful creation of new account',
  })
  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto.username, dto.password);
  }
}
