import { Injectable } from "@nestjs/common";

import { DOMAINS } from "src/config/domain";
import ENDPOINTS from "src/config/endpoint";

import { CustomException } from "src/exception/custom-exception";
import { RestTemplate } from "src/core/http/rest.template";

import { accessLogger, errorLogger } from "src/core/util/logger";

@Injectable()
export class CmsService {
    private readonly accessLogger = accessLogger.child({
        service: CmsService.name,
    });
    private readonly errorLogger = errorLogger.child({
        service: CmsService.name,
    });
    private readonly CMS_SERVICE = DOMAINS().CMS_SERVICE;

    constructor(private readonly restTemplate: RestTemplate) { }

    async _getLayoutByParentCategory(query): Promise<any> {
        try {
            this.accessLogger.info("Method: _getLayoutByParentCategory :: start");
            const url =
                this.CMS_SERVICE +
                ENDPOINTS.CMS_SERVICE.GET_LAYOUT_BY_PARENT_CATEGORY;
            const { data } = await this.restTemplate.get(url, query);
            this.accessLogger.info("Method: _getLayoutByParentCategory :: end");
            return data;
        } catch (err) {
            this.errorLogger.error(
                `Method: _getLayoutByParentCategory :: exceptionError: ${err.message}`
            );
            throw new CustomException(err.message);
        }
    }
}
