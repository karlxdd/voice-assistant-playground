import { Resolver, Query, Args } from '@nestjs/graphql';
import { ProductService } from '../product/product.service.js';
import { OpenaiService } from '../openai/openai.service.js';

@Resolver()
export class VoiceResolver {
  constructor(
    private readonly productService: ProductService,
    private readonly openaiService: OpenaiService,
  ) {}

  @Query(() => String)
  async handleVoiceCommand(@Args('command') command: string): Promise<string> {
    const aiResponse = await this.openaiService.sendMessage(command);
    
    if (command.toLowerCase().includes('list all the products')) {
      const products = await this.productService.getAllProducts();
      const productNames = products.map((product) => product.name).join(', ');
      return `The products are: ${productNames}`;
    }

    return aiResponse;
  }
}