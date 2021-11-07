import {
  Controller,
  Body,
  Post,
  UseGuards,
  HttpStatus,
  Res,
} from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { Response } from "express";
import { AuthService } from "./auth.service";
import { LoginPayload } from "./login.payload";
import { RegisterPayload } from "./register.payload";
import { UsersService } from "../user/user.service";
import { JwtAuthGuard } from "../common/guards/jwt-guard";

@Controller("auth")
//@ApiTags("authentication")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService
  ) {}

  @Post("login")
  //@UseGuards(JwtAuthGuard)
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: "Successful Login" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  async login(@Body() credentials: LoginPayload): Promise<any> {
    const user = await this.authService.validateUser(credentials);
    return await this.authService.generateToken(user);
  }

  @Post("register")
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    description: "Successful Registration",
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  async register(
    @Body() payload: RegisterPayload,
    @Res() res: Response
  ): Promise<any> {
    const user = await this.userService.create(payload);
    delete user.password;
    return res
      .status(HttpStatus.ACCEPTED)
      .json({ message: "Successful Registration", data: user });
  }
}
