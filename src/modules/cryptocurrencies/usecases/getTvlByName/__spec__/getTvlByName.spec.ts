import { CryptocurrenciesService } from 'src/modules/cryptocurrencies/cryptocurrencies.service';
import { GetTvlByName } from '../getTvlByName';
import { RedisService } from 'src/infra/redis.service';

describe('GetTvlByName', () => {
  let service: GetTvlByName;
  let cryptocurrenciesService: CryptocurrenciesService;
  let redisService: RedisService;

  beforeEach(async () => {
    cryptocurrenciesService = {
      findByName: jest.fn().mockResolvedValue({ name: 'Ethereum' }),
    } as unknown as CryptocurrenciesService;

    redisService = {
      getValue: jest.fn().mockResolvedValue('{50000}'),
    } as unknown as RedisService;

    service = new GetTvlByName(cryptocurrenciesService, redisService);
  });

  it('should return the token TVL if a valid token is provided', async () => {
    const tokenId = 'Ethereum';
    const result = await service.execute(tokenId);
    expect(result).toEqual(50000);
  });
});
