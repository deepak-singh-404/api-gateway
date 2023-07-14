import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query, Request, Response, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { requestParser, sendApiResponse } from "src/core/util";
import { CustomException } from "src/exception/custom-exception";
import { ExceptionLogRepository } from "src/database/mongodb/repository/exception-log.repository";
import { UserService } from "../user/user.service";
import { Public } from "./constant";
import { JwtAuthGuard } from "./jwt-auth.guard";

@Controller("auth")
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private userService: UserService,
        private readonly exceptionLogRepository: ExceptionLogRepository
    ) { }


    @Public()
    @Post("token")
    @HttpCode(200)
    async generateTokenForGuestUser(@Request() req, @Response() res, @Body() body: any): Promise<any> {
        try {
            const data = await this.authService._generateTokenForGuestUser(body)
            return sendApiResponse(res, true, HttpStatus.OK, 'success', data)
        }
        catch (err) {
            this.exceptionLogRepository.saveExceptionLog(requestParser(req) as any)
            throw new CustomException(err.message);
        }
    }


    @UseGuards(JwtAuthGuard)
    @Get('profile')
    @HttpCode(200)
    async getCartOfGuestUser(@Request() req, @Response() res, @Body() body: any): Promise<any> {
        try {
            return sendApiResponse(res, true, HttpStatus.OK, 'success', req.user)
        }
        catch (err) {
            this.exceptionLogRepository.saveExceptionLog(requestParser(req) as any)
            throw new CustomException(err.message);
        }
    }
}