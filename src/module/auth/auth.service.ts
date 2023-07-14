import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';

import { DOMAINS } from "src/config/domain";
import ENDPOINTS from "src/config/endpoint";

import { CustomException } from "src/exception/custom-exception";
import { RestTemplate } from "src/core/http/rest.template";

import { accessLogger, errorLogger } from "src/core/util/logger";
import { sendApiResponse } from "src/core/util";
import { UserService } from "../user/user.service";


@Injectable()
export class AuthService {
    constructor(
        private readonly restTemplate: RestTemplate,
        private jwtService: JwtService,
        private usersService: UserService
    ) { }

    /*
    Generate token for guest user
    */
    async _generateTokenForGuestUser(generateTokenRequestDTO): Promise<any> {
        try {
            const payload = {
                deviceId: generateTokenRequestDTO.deviceId,
                deviceName: generateTokenRequestDTO.deviceName
            }
            const accessToken = await this.jwtService.signAsync(payload)
            return {
                accessToken: accessToken
            }
        } catch (err) {
            throw err
        }
    }


    /*
     Signin (email password )
    */
    async signIn(username: string, pass: string): Promise<any> {
        try {
            const user = await this.usersService.findOne(username);
            if (user?.password !== pass) {
                throw new UnauthorizedException();
            }
            const { password, ...result } = user;
            // TODO: Generate a JWT and return it here
            // instead of the user object
            return result;

        }
        catch (err) {
            throw err;

        }
    }






}
