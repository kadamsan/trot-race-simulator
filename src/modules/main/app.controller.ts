import { Get, Controller, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiSecurity } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";

import { AppService } from "./app.service";
import { JwtAuthGuard } from "../common/guards/jwt-guard";

@ApiBearerAuth("access-token")
//@ApiSecurity('access-token')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  root(): string {
    return this.appService.root();
  }
}
