import { Resolver, Query, Args } from '@nestjs/graphql';
import { SponsorsService } from './sponsors.service';
import { Sponsor } from 'src/graphql';

@Resolver('Sponsor')
export class SponsorsResolver {
  constructor(private readonly sponsorService: SponsorsService) {}

  @Query(() => [Sponsor])
  async sponsors() {
    return this.sponsorService.findAll();
  }

  @Query(() => Sponsor)
  async sponsor(@Args('token') token: string) {
    return await this.sponsorService.findByToken(token);
  }
}
