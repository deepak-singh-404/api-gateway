import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";
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
    HealthModule,
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
  ],
})

export class AppModule {}

// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(helmet()).forRoutes('*');
//   }
// }