import { Injectable } from "@nestjs/common";

import { DOMAINS } from "src/config/domain";
import ENDPOINTS from "src/config/endpoint";

import { CustomException } from "src/exception/custom-exception";
import { RestTemplate } from "src/core/http/rest.template";
import { accessLogger, errorLogger } from "src/core/util/logger";
import { ERROR_MESSAGES } from "src/constant/api.message";

@Injectable()
export class SearchService {
  private readonly accessLogger = accessLogger.child({
    service: SearchService.name,
  });
  private readonly errorLogger = errorLogger.child({
    service: SearchService.name,
  });

  private readonly SEARCH_SERVICE = DOMAINS().SEARCH_SERVICE;

  constructor(private readonly restTemplate: RestTemplate) { }

  async _getListOfBrands(body): Promise<any> {
    try {
      this.accessLogger.info("Method: _getListOfBrands :: start");
      const url =
        this.SEARCH_SERVICE + ENDPOINTS.SEARCH_SERVICE.GET_LIST_OF_BRANDS;
      const { data } = await this.restTemplate.post(url, body, null);
      this.accessLogger.info("Method: _getListOfBrands :: end");
      return data;
    } catch (err) {
      this.errorLogger.error(
        `Method: _getListOfBrands :: exceptionError: ${err.message}`
      );
      throw new CustomException(err.message);
    }
  }

  async _getSuggestionsByBrand(query): Promise<any> {
    try {
      this.accessLogger.info("Method: _getSuggestionsByBrand :: start");
      const url =
        this.SEARCH_SERVICE +
        ENDPOINTS.SEARCH_SERVICE.GET_SUGGESTIONS_BY_BRANDS;
      const { data } = await this.restTemplate.get(url, query);
      this.accessLogger.info("Method: _getSuggestionsByBrand :: end");
      return data;
    } catch (err) {
      this.errorLogger.error(
        `Method: _getSuggestionsByBrand :: exceptionError: ${err.message}`
      );
      throw new CustomException(err.message);
    }
  }

  async _searchProductsByBrand(body): Promise<any> {
    try {
      this.accessLogger.info("Method: _searchProductsByBrand :: start");
      const url =
        this.SEARCH_SERVICE +
        ENDPOINTS.SEARCH_SERVICE.SEARCH_PRODUCTS_BY_BRAND;
      const { data } = await this.restTemplate.post(url, body, null);
      this.accessLogger.info("Method: _searchProductsByBrand :: end");
      return data;
    } catch (err) {
      this.errorLogger.error(
        `Method: _searchProductsByBrand :: exceptionError: ${err.message}`
      );
      throw new CustomException(err.message);
    }
  }


  async _searchProductsByBrandV2(body): Promise<any> {
    try {
      this.accessLogger.info("Method: _searchProductsByBrandV2 :: start");

      const { brand } = body
      let res1;

      if (brand && Array.isArray(brand) && brand.length == 1) {
        let url1 = this.SEARCH_SERVICE + ENDPOINTS.SEARCH_SERVICE.GET_BRAND_BY_NAME + brand[0]
        res1 = await this.restTemplate.get(url1);
      }

      if (res1 && res1.data) {
        if (!res1.data.data) {
          throw new Error(ERROR_MESSAGES.BRAND_NOT_FOUND)
        }
        else {
          body["brand"] = [res1.data.data.brandId]
        }
      }

      //Search by brand
      let url2 = this.SEARCH_SERVICE + ENDPOINTS.SEARCH_SERVICE.SEARCH_PRODUCTS_BY_BRAND
      const res2 = await this.restTemplate.post(url2, body, null);
      this.accessLogger.info("Method: _searchProductsByBrandV2 :: end");
      return res2.data;
    } catch (err) {
      this.errorLogger.error(
        `Method: _searchProductsByBrand :: exceptionError: ${err.message}`
      );
      throw new CustomException(err.message);
    }
  }


  async _getBrandById(param): Promise<any> {
    try {
      this.accessLogger.info("Method: _getBrandById :: start");
      const url =
        this.SEARCH_SERVICE + ENDPOINTS.SEARCH_SERVICE.GET_BRAND_BY_ID + param.brandId;
      const { data } = await this.restTemplate.get(url);
      this.accessLogger.info("Method: _getBrandById :: end");
      return data;
    } catch (err) {
      this.errorLogger.error(
        `Method: _getBrandById :: exceptionError: ${err.message}`
      );
      throw new CustomException(err.message);
    }
  }

  async _getBrandByName(param): Promise<any> {
    try {
      this.accessLogger.info("Method: _getBrandByName :: start");
      const url =
        this.SEARCH_SERVICE + ENDPOINTS.SEARCH_SERVICE.GET_BRAND_BY_NAME + param.brandName;
      const { data } = await this.restTemplate.get(url);
      this.accessLogger.info("Method: _getBrandByName :: end");
      return data;
    } catch (err) {
      this.errorLogger.error(
        `Method: _getBrandByName :: exceptionError: ${err.message}`
      );
      throw new CustomException(err.message);
    }
  }

  async _suggestion(query): Promise<any> {
    try {
      this.accessLogger.info("Method: _suggestion :: start");
      const url =
        this.SEARCH_SERVICE +
        ENDPOINTS.SEARCH_SERVICE.SUGGESTION;
      const { data } = await this.restTemplate.get(url, query);
      this.accessLogger.info("Method: _suggestion :: end");
      return data;
    } catch (err) {
      this.errorLogger.error(
        `Method: _suggestion :: exceptionError: ${err.message}`
      );
      throw new CustomException(err.message);
    }
  }

  async _getBreadcrumb(query): Promise<any> {
    try {
      this.accessLogger.info("Method: _getBreadcrumb :: start");
      const url =
        this.SEARCH_SERVICE +
        ENDPOINTS.SEARCH_SERVICE.GET_BREADCRUMB;
      const { data } = await this.restTemplate.get(url, query);
      this.accessLogger.info("Method: _getBreadcrumb :: end");
      return data;
    } catch (err) {
      this.errorLogger.error(
        `Method: _suggestion :: _getBreadcrumb: ${err.message}`
      );
      throw new CustomException(err.message);
    }
  }

  async _getSimilarProducts(body): Promise<any> {
    try {
      this.accessLogger.info("Method: _getSimilarProducts :: start");
      const url =
        this.SEARCH_SERVICE +
        ENDPOINTS.SEARCH_SERVICE.GET_SIMILAR_PRODUCTS;
      const { data } = await this.restTemplate.post(url, body, null);
      this.accessLogger.info("Method: _getSimilarProducts :: end");
      return data;
    } catch (err) {
      this.errorLogger.error(
        `Method: _suggestion :: _getSimilarProducts: ${err.message}`
      );
      throw new CustomException(err.message);
    }
  }
}
