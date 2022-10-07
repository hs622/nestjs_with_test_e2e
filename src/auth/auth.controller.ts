import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Register, Login } from './schema';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() RegisterValidation: Register) {
    console.log({ RegisterValidation });
    return this.authService.register(RegisterValidation);
  }

  @Post('login')
  login(@Body() LoginValidation: Login) {
    console.log({ LoginValidation });
    return this.authService.login(LoginValidation);
  }
}
