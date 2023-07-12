import { Injectable } from "@nestjs/common";

import { DOMAINS } from "src/config/domain";
import ENDPOINTS from "src/config/endpoint";

import { CustomException } from "src/exception/custom-exception";
import { RestTemplate } from "src/core/http/rest.template";

import { accessLogger, errorLogger } from "src/core/util/logger";

@Injectable()
export class AddressService {
    private readonly accessLogger = accessLogger.child({
        service: AddressService.name,
    });
    private readonly errorLogger = errorLogger.child({
        service: AddressService.name,
    });
    private readonly ADDRESS_SERVICE = DOMAINS().ADDRESS_SERVICE;

    constructor(private readonly restTemplate: RestTemplate) { }

    async _checkServiceAvailability(query): Promise<any> {
        try {
            this.accessLogger.info("Method: _checkServiceAvailability :: start");
            const url =
                this.ADDRESS_SERVICE +
                ENDPOINTS.ADDRESS_SERVICE.CHECK_SERVICE_AVAILABILITY;
            const { data } = await this.restTemplate.get(url, query);
            this.accessLogger.info("Method: _checkServiceAvailability :: end");
            return data;
        } catch (err) {
            this.errorLogger.error(
                `Method: _checkServiceAvailability :: exceptionError: ${err.message}`
            );
            throw new CustomException(err.message);
        }
    }
}
