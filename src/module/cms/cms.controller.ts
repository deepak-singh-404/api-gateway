import { Controller, Get, HttpCode, Post, Query } from "@nestjs/common";
import { CmsService } from "./cms.service";

@Controller("/")
export class CmsController {
    constructor(private readonly cmsService: CmsService) { }

    @Get("/layout/getLayoutByParentCategory")
    @HttpCode(200)
    async getLayoutByParentCategory(@Query() query: any): Promise<any> {
        return this.cmsService._getLayoutByParentCategory(query);
    }
}