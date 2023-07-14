import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { HttpModule } from "@nestjs/axios";
import { JwtModule } from '@nestjs/jwt';
import { RestTemplate } from "src/core/http/rest.template";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { ExceptionLogRepository } from "src/database/mongodb/repository/exception-log.repository";
import { MongooseModule } from "@nestjs/mongoose";
import { ExceptionLog, ExceptionLogSchema } from "src/database/mongodb/entity/exception-log.entity";
import { UserModule } from "../user/user.module";
import { JWT_CONSTANTS } from './constant';
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./jwt-strategy";

@Module({
    imports: [
        ConfigModule,
        HttpModule,
        MongooseModule.forFeature([{ name: ExceptionLog.name, schema: ExceptionLogSchema }]),
        JwtModule.register({
            global: true,
            secret: JWT_CONSTANTS.secret,
            signOptions: { expiresIn: JWT_CONSTANTS.expiresIn },
        }),
        PassportModule,
        UserModule
    ],
    providers: [AuthService, RestTemplate, ExceptionLogRepository, JwtStrategy],
    controllers: [AuthController],
    exports: [AuthService]
})
export class AuthModule { }
