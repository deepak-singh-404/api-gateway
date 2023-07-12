import { Injectable } from "@nestjs/common";

import { DOMAINS } from "src/config/domain";
import ENDPOINTS from "src/config/endpoint";

import { CustomException } from "src/exception/custom-exception";
import { RestTemplate } from "src/core/http/rest.template";

import { accessLogger, errorLogger } from "src/core/util/logger";

@Injectable()
export class RfqService {
    private readonly accessLogger = accessLogger.child({
        service: RfqService.name,
    });
    private readonly errorLogger = errorLogger.child({
        service: RfqService.name,
    });
    private readonly RFQ_SERVICE = DOMAINS().RFQ_SERVICE;
    private readonly RFQ_API_SERVICE = DOMAINS().RFQ_API_SERVICE

    constructor(private readonly restTemplate: RestTemplate) { }

    async _createRfq(body): Promise<any> {
        try {
            this.accessLogger.info("Method: _createRfq :: start");
            const url =
                this.RFQ_SERVICE +
                ENDPOINTS.RFQ_SERVICE.CREATE_RFQ;
            const { data } = await this.restTemplate.post(url, body, null);
            this.accessLogger.info("Method: _createRfq :: end");
            return data;
        } catch (err) {
            this.errorLogger.error(
                `Method: _createRfq :: exceptionError: ${err.message}`
            );
            throw new CustomException(err.message);
        }
    }

    async _getRfqsByUserId(query): Promise<any> {
        try {
            this.accessLogger.info("Method: _getRfqsByUserId :: start");
            const url =
                this.RFQ_API_SERVICE +
                ENDPOINTS.RFQ_API_SERVICE.GET_RFQS_BY_USER_ID;
            let config = {
                "headers": {
                    "userId": query.userId
                }
            }
            const { data } = await this.restTemplate.post(url, {}, config);
            this.accessLogger.info("Method: _getRfqsByUserId :: end");
            return data;
        } catch (err) {
            this.errorLogger.error(
                `Method: _createRfq :: exceptionError: ${err.message}`
            );
            throw new CustomException(err.message);
        }
    }
}
