import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { APP_FILTER, APP_GUARD } from "@nestjs/core";
import { ConfigModule } from "@nestjs/config";
import helmet from 'helmet';
import { DOMAINS } from "./config/domain";
import { CustomExceptionFilter } from "./filter/custom-exception.filter";

//Modules
import { PlatformModule } from "./module/platform/platform.module";
import { SearchModule } from "./module/search/search.module";
import { HealthModule } from "./module/health/health.module";
import { CmsModule } from "./module/cms/cms.module";
import { AddressModule } from "./module/address/address.module";
import { RfqModule } from "./module/rfq/rfq.module";
import { AuthModule } from "./module/auth/auth.module";
import { MongodbModule } from "./database/mongodb/mongodb.module";
import { AuthGuard } from "./module/auth/auth.guard";
import { JwtAuthGuard } from "./module/auth/jwt-auth.guard";

// dotenv.config()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV
        ? `.env.${process.env.NODE_ENV}`
        : ".env.development",
      load: [DOMAINS],
    }),
    MongodbModule,
    HealthModule,
    AuthModule,
    SearchModule,
    PlatformModule,
    CmsModule,
    AddressModule,
    RfqModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: CustomExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    }
  ],
})

export class AppModule { }

// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(helmet()).forRoutes('*');
//   }
// }