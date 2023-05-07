import {
  Resolver,
  Query,
  Args,
  ResolveField,
  Parent,
  Float,
} from '@nestjs/graphql';
import {
  Cryptocurrency,
  GlobalData,
  CryptocurrencyChanges,
  Sponsor,
} from 'src/graphql';
import { GetAllSponsorById } from '../sponsors/usecases/getAllSponsorByName/getAllSponsorById';
import { CryptocurrenciesService } from './cryptocurrencies.service';
import { GetCryptocurrencyById } from './usecases/getCryptocurrencyById/getCryptocurrencyById';
import { GetGlobalData } from './usecases/getGlobalData/getGlobalData';
import { InternalServerErrorException } from '@nestjs/common';
import { GetTvlByName } from './usecases/getTvlByName/getTvlByName';

@Resolver('Cryptocurrency')
export class CryptocurrenciesResolver {
  constructor(
    private readonly cryptocurrenciesService: CryptocurrenciesService,
    private readonly getCryptocurrencyChangesById: GetCryptocurrencyById,
    private readonly getAllSponsorById: GetAllSponsorById,
    private readonly getGlobalData: GetGlobalData,
    private readonly getTvlByName: GetTvlByName,
  ) {}

  @Query(() => [Cryptocurrency])
  async getAllCryptocurrencies() {
    return await this.cryptocurrenciesService.findAll();
  }

  @Query(() => Cryptocurrency)
  async getCryptocurrencyByName(@Args('name') name: string) {
    return await this.cryptocurrenciesService.findByName(name);
  }

  @Query(() => GlobalData)
  async getGlobalMarketData(): Promise<GlobalData> {
    try {
      const result = await this.getGlobalData.execute();
      return result;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to fetch global market data',
      );
    }
  }

  @ResolveField(() => CryptocurrencyChanges)
  async cryptocurrencyChanges(
    @Parent() cryptocurrency: Cryptocurrency,
  ): Promise<CryptocurrencyChanges> {
    const { name } = cryptocurrency;

    try {
      const cryptocurrencyChanges =
        await this.getCryptocurrencyChangesById.execute(name);
      return cryptocurrencyChanges;
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to retrieve cryptocurrency changes for ${name}: ${error.message}`,
      );
    }
  }

  @ResolveField(() => [Sponsor])
  async sponsorData(
    @Parent() cryptocurrency: Cryptocurrency,
  ): Promise<Sponsor[]> {
    const { name } = cryptocurrency;

    try {
      const sponsors = await this.getAllSponsorById.execute(name);
      return sponsors;
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to retrieve sponsor data for ${name}: ${error.message}`,
      );
    }
  }

  @ResolveField(() => Float)
  async tvl(@Parent() cryptocurrency: Cryptocurrency): Promise<number> {
    const { name } = cryptocurrency;

    try {
      const tvl = await this.getTvlByName.execute(name);
      return tvl;
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to retrieve TVL data for ${name}: ${error.message}`,
      );
    }
  }
}
