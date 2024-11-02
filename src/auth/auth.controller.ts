import { Body, Controller, Post } from '@nestjs/common';
import { createUserDTO } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { loginUserDTO } from './dto/login-user.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: createUserDTO })
  @Post('signup')
  async signup(@Body() createUserDTO: createUserDTO) {
    return await this.authService.create(createUserDTO);
  }

  @ApiBody({ type: loginUserDTO })
  @Post('login')
  async login(@Body() loginUserDTO: loginUserDTO) {
    return await this.authService.login(loginUserDTO);
  }
}
