import { Module } from "@nestjs/common";
import { PlatformService } from "./platform.service";
import { PlatformController } from "./platform.controller";
import { ConfigModule } from "@nestjs/config";
import { HttpModule } from "@nestjs/axios";
import { RestTemplate } from "src/core/http/rest.template";

@Module({
  imports: [ConfigModule, HttpModule],
  providers: [PlatformService, RestTemplate],
  controllers: [PlatformController],
})
export class PlatformModule {}
