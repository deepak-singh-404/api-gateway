import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";

import { SearchService } from "./search.service";
import { SearchController } from "./search.controller";
import { RestTemplate } from "src/core/http/rest.template";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [ConfigModule, HttpModule],
  providers: [SearchService, RestTemplate],
  controllers: [SearchController],
})
export class SearchModule {}
