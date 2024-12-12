import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ProductModule } from '../../modules/product/product.module.js';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/common/graphql/schema.gql'), // Automatically generate schema
      playground: true, // Enable GraphQL Playground
      introspection: true, // Enable introspection for testing
    }),
    ProductModule,
  ],
})
export class AppGraphQLModule {}
