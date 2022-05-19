import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  /*
   *
   * Administrator authentication method. Because we have only one administrator (the login and password are set in the environment variables), 
   * we just need to check if the transferred basic token is correct
   */
  @Get()
  @UseGuards(AuthGuard('basic'))
  async checkAuthData() {
    return { isValid: true };
  }
}
