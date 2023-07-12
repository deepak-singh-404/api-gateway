import { Module } from "@nestjs/common";
import { CmsService } from "./cms.service";
import { CmsController } from "./cms.controller";
import { ConfigModule } from "@nestjs/config";
import { HttpModule } from "@nestjs/axios";
import { RestTemplate } from "src/core/http/rest.template";

@Module({
    imports: [ConfigModule, HttpModule],
    providers: [CmsService, RestTemplate],
    controllers: [CmsController],
})
export class CmsModule { }
