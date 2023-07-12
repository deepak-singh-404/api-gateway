import { Injectable } from "@nestjs/common";

import { DOMAINS } from "src/config/domain";
import ENDPOINTS from "src/config/endpoint";

import { CustomException } from "src/exception/custom-exception";
import { RestTemplate } from "src/core/http/rest.template";

import { accessLogger, errorLogger } from "src/core/util/logger";

@Injectable()
export class PlatformService {
  private readonly accessLogger = accessLogger.child({
    service: PlatformService.name,
  });
  private readonly errorLogger = errorLogger.child({
    service: PlatformService.name,
  });
  private readonly PLATFORM_SERVICE = DOMAINS().PLATFORM_SERVICE;

  constructor(private readonly restTemplate: RestTemplate) {}

  async _getDigimroProductByMSN(query): Promise<any> {
    try {
      this.accessLogger.info("Method: _getDigimroProductByMSN :: start");
      const url =
        this.PLATFORM_SERVICE +
        ENDPOINTS.PLATFORM_SERVICE.GET_DIGIMRO_PRODUCT_BY_MSN;
      const { data } = await this.restTemplate.get(url, query);
      this.accessLogger.info("Method: _getDigimroProductByMSN :: end");
      return data;
    } catch (err) {
      this.errorLogger.error(
        `Method: _getDigimroProductByMSN :: exceptionError: ${err.message}`
      );
      throw new CustomException(err.message);
    }
  }
}
