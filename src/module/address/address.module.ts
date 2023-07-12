import { Module } from "@nestjs/common";
import { AddressService } from "./address.service";
import { AddressController } from "./address.controller";
import { ConfigModule } from "@nestjs/config";
import { HttpModule } from "@nestjs/axios";
import { RestTemplate } from "src/core/http/rest.template";

@Module({
    imports: [ConfigModule, HttpModule],
    providers: [AddressService, RestTemplate],
    controllers: [AddressController],
})
export class AddressModule { }
