import { Body, Controller, Get, Query, Post, Put, HttpCode, Param } from "@nestjs/common";
import { SearchService } from "./search.service";

@Controller("/search")
export class SearchController {
  constructor(private readonly searchService: SearchService) { }

  @Post("/brands")
  @HttpCode(200)
  async getListOfBrands(@Body() body: any): Promise<any> {
    return this.searchService._getListOfBrands(body);
  }

  @Get("/suggestion/brand")
  @HttpCode(200)
  async getSuggestionsByBrand(@Query() query: any): Promise<any> {
    return this.searchService._getSuggestionsByBrand(query);
  }

  @Post("/searchProductsByBrand")
  @HttpCode(200)
  async searchProductsByBrand(@Body() body: any): Promise<any> {
    return this.searchService._searchProductsByBrand(body);
  }

  @Post("/searchProductsByBrandV2")
  @HttpCode(200)
  async searchProductsByBrandV2(@Body() body: any): Promise<any> {
    return this.searchService._searchProductsByBrandV2(body);
  }

  @Get("/getBrandById/:brandId")
  @HttpCode(200)
  async getBrandById(@Param() param: any): Promise<any> {
    return this.searchService._getBrandById(param);
  }

  @Get("/getBrandByName/:brandName")
  @HttpCode(200)
  async getBrandByName(@Param() param: any): Promise<any> {
    return this.searchService._getBrandByName(param);
  }

  @Get("/suggestion")
  @HttpCode(200)
  async suggestion(@Query() query: any): Promise<any> {
    return this.searchService._suggestion(query);
  }

  @Get("/getBreadcrumb")
  @HttpCode(200)
  async getBreadcrumb(@Query() query: any): Promise<any> {
    return this.searchService._getBreadcrumb(query);
  }

  @Post("/getSimilarProducts")
  @HttpCode(200)
  async getSimilarProducts(@Body() body: any): Promise<any> {
    return this.searchService._getSimilarProducts(body);
  }

}
