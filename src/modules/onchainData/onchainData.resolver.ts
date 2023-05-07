import { Resolver, Query, Args } from '@nestjs/graphql';
import { GetOnchainDataByName } from './usecases/getOnchainDataByName';
import { OnchainData } from 'src/graphql';
import { InternalServerErrorException } from '@nestjs/common';

@Resolver('OnchainData')
export class OnchainDataResolver {
  constructor(private readonly getOnchainDatasByName: GetOnchainDataByName) {}

  @Query(() => OnchainData)
  async getOnchainDataByName(@Args('name') name: string) {
    try {
      const result = await this.getOnchainDatasByName.execute(name);
      return result;
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to retrieve OnchainData for ${name}: ${error.message}`,
      );
    }
  }
}
