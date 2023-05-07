import { Injectable } from '@nestjs/common';
import { CryptocurrencyChanges } from 'src/graphql';
import { RedisService } from 'src/infra/redis.service';
import { CryptocurrenciesService } from '../../cryptocurrencies.service';

@Injectable()
export class GetCryptocurrencyById {
  constructor(
    private readonly cryptocurrenciesService: CryptocurrenciesService,
    private readonly redisService: RedisService,
  ) {}

  async execute(tokenId: string): Promise<CryptocurrencyChanges> {
    const token = await this.cryptocurrenciesService.findByName(tokenId);
    const tokenKeyName = 'cryptocurrency:' + token.name;
    const tokenChanges = await this.redisService.getValue(tokenKeyName);
    const result = JSON.parse(tokenChanges);
    return result;
  }
}
