import { Test, TestingModule } from '@nestjs/testing';
import { VoiceResolver } from './voice.resolver';

describe('VoiceResolver', () => {
  let resolver: VoiceResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VoiceResolver],
    }).compile();

    resolver = module.get<VoiceResolver>(VoiceResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
