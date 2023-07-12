import { Controller, Get, HttpCode, Post, Query } from "@nestjs/common";
import { AddressService } from "./address.service";

@Controller("/address")
export class AddressController {
    constructor(private readonly addressService: AddressService) { }

    @Get("/checkServiceAvailability")
    @HttpCode(200)
    async checkServiceAvailability(@Query() query: any): Promise<any> {
        return this.addressService._checkServiceAvailability(query);
    }
}