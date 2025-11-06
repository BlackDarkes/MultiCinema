import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { RegisterDto } from './common/dto/register.dto';
import { compare, hash } from 'bcrypt';
import { LoginDto } from './common/dto/login.dto';
import { Request, Response } from 'express';
import { IPayload } from 'src/types/jwt.interface';
import { isDev } from 'src/utils/is-dev.util';

@Injectable()
export class AuthService {
  private readonly JWT_ACCESS_TOKEN_TTL: string;
  private readonly JWT_REFRESH_TOKEN_TTL: string;

  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.JWT_ACCESS_TOKEN_TTL = configService.getOrThrow<string>("JWT_ACCESS_TOKEN_TTL");
    this.JWT_REFRESH_TOKEN_TTL = configService.getOrThrow<string>("JWT_REFRESH_TOKEN_TTL");
  }

  async register(dto: RegisterDto) {
    const { name, email, password, city } = dto;
    const user = await this.userService.getByEmail(email);

    if (user) {
      throw new UnauthorizedException("Пользователь с такой почтой уже есть!");
    }

    await this.userService.create({
      name,
      email,
      password: await hash(password, 10),
      city,
    })
  }

  async validate(id: string) {
    const user = await this.userService.getById(id);

    if (!user) {
      throw new UnauthorizedException("Пользователь не найден!");
    }

    return user;
  }

  async login(res: Response, dto: LoginDto) {
    const { email, password } = dto;
    const user = await this.userService.getByEmail(email);

    if (!user || !(await compare(password, user.password))) {
      throw new UnauthorizedException("Неверный логин или пароль!");
    }

    return this.auth(res, user.id);
  }

  async refresh(req: Request, res: Response) {
    const refreshToken = req?.cookies["refresh_token"]

    if (!refreshToken) {
      throw new UnauthorizedException("Недействительный refresh токен!");
    }

    const payload: IPayload = await this.jwtService.verifyAsync(refreshToken);

    if (payload) {
      const user = await this.userService.getById(payload.id);

      if (!user) {
        throw new NotFoundException("пользователь не найден!");
      }

      return this.auth(res, user.id);
    }
  }

  async logout(res: Response) {
    this.setCookie(res, "refresh_token", new Date(0));
  }

  private createTokens(id: string) {
		const payload: IPayload = { id };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: this.JWT_ACCESS_TOKEN_TTL,
    } as any);

		const refreshToken = this.jwtService.sign(payload, {
			expiresIn: this.JWT_REFRESH_TOKEN_TTL,
		} as any);

		return {
			accessToken,
			refreshToken,
		};
	}

  private setCookie (res: Response, value: string, expires: Date) {
    res.cookie("refresh_token", value, {
      httpOnly: true,
      domain: "",
      expires,
      secure: !isDev(this.configService),
      sameSite: isDev(this.configService) ? "strict" : "none",
    })
  }

  private auth(res: Response, id: string) {
		const { accessToken, refreshToken } = this.createTokens(id);

		this.setCookie(
			res,
			refreshToken,
			new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
		);

		return { accessToken };
	}
}
