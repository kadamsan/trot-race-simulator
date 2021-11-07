import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { ConfigService } from "../config/config.service";
import { User } from "../user/user.entity";
import { UsersService } from "../user/user.service";
import { JwtPayload } from "./jwt.payload";
import { LoginPayload } from "./login.payload";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userService: UsersService
  ) {}

  async generateToken(user: User) {
    let payload: JwtPayload = {
      sub: user.id.toString(),
    };
    return {
      expiresIn: this.configService.get("JWT_EXPIRATION_TIME"),
      accessToken: this.jwtService.sign({ ...payload }),
    };
  }

  async validateUser({ email, password }: LoginPayload): Promise<any> {
    const user = await this.userService.getByEmailAndPass(email, password);
    if (!user) {
      throw new UnauthorizedException("Wrong email or password !");
    }
    delete user.password;
    delete user.email;
    return user;
  }

  async validate(payload: JwtPayload): Promise<any> {
    const user = await this.userService.get(+payload.sub);
    if (!user) {
      throw new HttpException("Invalid token", HttpStatus.UNAUTHORIZED);
    }
    delete user.password;
    delete user.email;
    return user;
  }
}
