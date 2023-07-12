import { Body, Controller, Get, HttpCode, Post, Query } from "@nestjs/common";
import { RfqService } from "./rfq.service";

@Controller("/rfq")
export class RfqController {
    constructor(private readonly rfqService: RfqService) { }

    @Post("/createRfq")
    @HttpCode(201)
    async createRfq(@Body() body: any): Promise<any> {
        return this.rfqService._createRfq(body);
    }

    @Get("/getRfqsByUserId")
    @HttpCode(200)
    async getRfqsByUserId(@Query() query: any): Promise<any> {
        return this.rfqService._getRfqsByUserId(query)
    }

}
