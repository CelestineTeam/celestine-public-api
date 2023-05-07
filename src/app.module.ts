import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLDateTime } from 'graphql-iso-date';
import { RedisService } from 'src/infra/redis.service';
import { CryptocurrenciesModule } from './modules/cryptocurrencies/cryptocurrencies.module';
import { SponsorsModule } from './modules/sponsors/sponsors.module';
import { OnchainDataModule } from './modules/onchainData/onchainData.module';
import { GithubOrganizationModule } from './modules/githubOrganization/githubOrganization.module';
@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      introspection: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault],
      typePaths: ['./**/*.graphql'],
      resolvers: { DateTime: GraphQLDateTime },
      cacheControl: {
        defaultMaxAge: 300,
      },
      persistedQueries: {
        cache: 'bounded',
        ttl: 1800,
      },
    }),
    CryptocurrenciesModule,
    SponsorsModule,
    OnchainDataModule,
    GithubOrganizationModule,
  ],
  controllers: [AppController],
  providers: [AppService, RedisService],
})
export class AppModule {}
