import { Module } from '@nestjs/common';
import { OpenaiModule } from '../openai/openai.module.js';
import { ProductModule } from '../product/product.module.js';
import { VoiceResolver } from './voice.resolver.js';

@Module({
  imports: [OpenaiModule, ProductModule],
  providers: [VoiceResolver],
})
export class VoiceModule {}
