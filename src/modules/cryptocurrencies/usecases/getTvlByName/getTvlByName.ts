import { Injectable } from '@nestjs/common';
import { RedisService } from 'src/infra/redis.service';
import { CryptocurrenciesService } from '../../cryptocurrencies.service';

@Injectable()
export class GetTvlByName {
  constructor(
    private readonly cryptocurrenciesService: CryptocurrenciesService,
    private readonly redisService: RedisService,
  ) {}

  tokenNameMappings = {
    BNB: 'Binance',
    'Curve DAO': 'Curve-Dex',
    PancakeSwap: 'Pancakeswap',
  };

  async execute(tokenId: string): Promise<number> {
    const token = await this.cryptocurrenciesService.findByName(tokenId);

    if (!token) {
      throw new Error('Token not found');
    }

    const tokenKeyName = `cryptocurrency:tvl:${token.name}`;
    let tokenTvl: string;

    try {
      tokenTvl = await this.redisService.getValue(tokenKeyName);
    } catch (error) {
      throw new Error(
        `Failed to retrieve token tvl for ${token.name}: ${error.message}`,
      );
    }

    if (!tokenTvl && token.name in this.tokenNameMappings) {
      const mappedTokenName = this.tokenNameMappings[token.name];
      const mappedTokenKeyName = `cryptocurrency:tvl:${mappedTokenName}`;

      try {
        tokenTvl = await this.redisService.getValue(mappedTokenKeyName);
      } catch (error) {
        throw new Error(
          `Failed to retrieve token tvl for ${mappedTokenName}: ${error.message}`,
        );
      }
    }

    if (!tokenTvl) {
      throw new Error(`No token tvl found for ${token.name}`);
    }

    let result: number;

    try {
      result = JSON.parse(tokenTvl);
    } catch (error) {
      throw new Error(
        `Failed to parse token changes for ${token.name}: ${error.message}`,
      );
    }

    return result;
  }
}
