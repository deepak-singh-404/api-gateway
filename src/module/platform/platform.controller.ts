import { Controller, Get, HttpCode, Post, Query } from "@nestjs/common";
import { PlatformService } from "./platform.service";

@Controller("/")
export class PlatformController {
  constructor(private readonly platformService: PlatformService) { }

  @Get("/product")
  @HttpCode(200)
  async getDigimroProductByMSN(@Query() query: any): Promise<any> {
    return this.platformService._getDigimroProductByMSN(query);
  }
}
