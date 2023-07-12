import { Controller, Get, HttpCode } from "@nestjs/common";
import { HealthService } from "./health.service";

@Controller("/")
export class HealthController {
  constructor(private readonly healthService: HealthService) { }

  @Get("/ping")
  @HttpCode(200)
  async ping(): Promise<any> {
    return this.healthService._pingPong();
  }

  @Get("/health")
  @HttpCode(200)
  async healthCheck(): Promise<any> {
    return this.healthService._healthCheck();
  }
}
