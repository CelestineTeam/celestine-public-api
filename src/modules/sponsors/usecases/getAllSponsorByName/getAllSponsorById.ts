import { Injectable } from '@nestjs/common';
import { Sponsor } from 'src/graphql';
import { CryptocurrenciesService } from 'src/modules/cryptocurrencies/cryptocurrencies.service';
import { SponsorsService } from '../../sponsors.service';

@Injectable()
export class GetAllSponsorById {
  constructor(
    private readonly cryptocurrenciesService: CryptocurrenciesService,
    private readonly sponsorService: SponsorsService,
  ) {}

  async execute(tokenId: string): Promise<Sponsor[]> {
    const token = await this.cryptocurrenciesService.findByName(tokenId);
    const sponsor = await this.sponsorService.findAllByToken(token.name);
    return sponsor;
  }
}
