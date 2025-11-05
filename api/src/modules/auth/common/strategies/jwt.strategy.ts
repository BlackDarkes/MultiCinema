import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "../../auth.service";
import { ConfigService } from "@nestjs/config";
import { IPayload } from "src/types/jwt.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow<string>("SECRET"),
      algorithms: ["HS256"]
    });
  }

  async validate(payload: IPayload) {
    return await this.authService.validate(payload.id)
  }
}