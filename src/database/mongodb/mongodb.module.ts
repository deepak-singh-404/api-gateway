import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://13.234.108.103:27018/online-gateway'),
    ],
})
export class MongodbModule { }