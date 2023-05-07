import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { RedisService } from 'src/infra/redis.service';
import { CryptocurrenciesService } from '../cryptocurrencies/cryptocurrencies.service';
import { SponsorsResolver } from './sponsors.resolver';
import { SponsorsService } from './sponsors.service';
import { GetAllSponsorById } from './usecases/getAllSponsorByName/getAllSponsorById';

@Module({
  providers: [
    PrismaService,
    SponsorsService,
    RedisService,
    GetAllSponsorById,
    CryptocurrenciesService,
  ],
})
export class SponsorsModule {}
