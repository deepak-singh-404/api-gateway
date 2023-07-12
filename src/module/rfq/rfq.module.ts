import { Module } from "@nestjs/common";
import { RfqService } from "./rfq.service";
import { RfqController } from "./rfq.controller";
import { ConfigModule } from "@nestjs/config";
import { HttpModule } from "@nestjs/axios";
import { RestTemplate } from "src/core/http/rest.template";

@Module({
    imports: [ConfigModule, HttpModule],
    providers: [RfqService, RestTemplate],
    controllers: [RfqController],
})
export class RfqModule { }
