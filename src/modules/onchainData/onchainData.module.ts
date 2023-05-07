import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { RedisService } from 'src/infra/redis.service';
import { OnchainDataResolver } from './onchainData.resolver';
import { OnchainDataService } from './onchainData.service';
import { GetOnchainDataByName } from './usecases/getOnchainDataByName';

@Module({
  providers: [
    PrismaService,
    OnchainDataResolver,
    OnchainDataService,
    RedisService,
    GetOnchainDataByName,
  ],
})
export class OnchainDataModule {}
