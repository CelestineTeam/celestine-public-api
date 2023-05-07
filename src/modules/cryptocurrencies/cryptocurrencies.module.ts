import { Module } from '@nestjs/common';
import { CryptocurrenciesService } from './cryptocurrencies.service';
import { CryptocurrenciesResolver } from './cryptocurrencies.resolver';
import { PrismaService } from 'prisma/prisma.service';
import { GetCryptocurrencyById } from './usecases/getCryptocurrencyById/getCryptocurrencyById';
import { RedisService } from 'src/infra/redis.service';
import { GetAllSponsorById } from '../sponsors/usecases/getAllSponsorByName/getAllSponsorById';
import { SponsorsService } from '../sponsors/sponsors.service';
import { GetGlobalData } from './usecases/getGlobalData/getGlobalData';
import { GetTvlByName } from './usecases/getTvlByName/getTvlByName';

@Module({
  providers: [
    PrismaService,
    CryptocurrenciesResolver,
    CryptocurrenciesService,
    GetCryptocurrencyById,
    RedisService,
    GetAllSponsorById,
    SponsorsService,
    GetGlobalData,
    GetTvlByName,
  ],
})
export class CryptocurrenciesModule {}
