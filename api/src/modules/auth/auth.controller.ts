import { Body, Controller, Get, HttpCode, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './common/dto/register.dto';
import { LoginDto } from './common/dto/login.dto';
import { Request, Response } from 'express';
import { UsersService } from '../users/users.service';
import { Auth } from './common/decorators/auth.decorators';
import { Authorize } from './common/decorators/authorize.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) {}

  @Post("registration")
  @HttpCode(201)
  async registry(@Body() dto: RegisterDto) {
    await this.authService.register(dto);

    return {
      message: "Вы успешно создали аккаунт!",
    }
  }

  @Post("login")
  @HttpCode(201)
  async login(@Res() res: Response, @Body() dto: LoginDto) {
    const accessToken = await this.authService.login(res, dto);
    const user = await this.usersService.getByEmail(dto.email);

    return {
      message: "Вы успешно вошли в аккаунт!",
      token: accessToken,
      user,
    }
  }

  @Post("refresh")
  @HttpCode(200)
  async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refreshToken = await this.authService.refresh(req, res);

    return {
      token: refreshToken,
    }
  }

  @Post("logout")
  @HttpCode(200)
  async logout(@Res({ passthrough: true }) res: Response) {
    await this.authService.logout(res);

    return {
      message: "Вы вышли из аккаунта!",
    }
  }

  @Auth()
  @Get("me")
  @HttpCode(200)
  async me(@Authorize() user) {
    return user
  }
}
