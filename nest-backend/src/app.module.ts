import * as dotenv from 'dotenv';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AppGraphQLModule } from './common/graphql/graphql.module.js';
import { OpenaiModule } from './modules/openai/openai.module.js';
import { ProductModule } from './modules/product/product.module.js';
import { VoiceModule } from './modules/voice/voice.module.js';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    AppGraphQLModule,
    OpenaiModule,
    ProductModule,
    VoiceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}