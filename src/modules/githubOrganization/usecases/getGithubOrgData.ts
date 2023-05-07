import { Injectable } from '@nestjs/common';
import { GitHubOrganization } from 'src/graphql';
import { RedisService } from 'src/infra/redis.service';

@Injectable()
export class GetGithubOrgDataByName {
  constructor(private readonly redisService: RedisService) {}

  orgNameMappings = {
    polygon: '0xPolygon',
    uniswap: 'Uniswap',
    aave: 'aave',
    bnb: 'bnb-chain',
    curve: 'curvefi',
    ethereum: 'ethereum',
    optimism: 'ethereum-optimism',
    pancakeswap: 'pancakeswap',
    raydium: 'raydium-io',
    solana: 'solana-labs',
  };

  async execute(orgName: string): Promise<GitHubOrganization> {
    const orgKeyname = 'organization:' + orgName;
    const orgData = await this.redisService.getValue(orgKeyname);
    const orgDataObj = JSON.parse(orgData);

    const rank = await this.redisService.getRank('celestine_ranking', orgName);
    const score = orgDataObj.celestine_score;

    if (rank == null) {
      await this.redisService.setSortedList(
        'celestine_ranking',
        score,
        orgName,
      );
      const newRank = await this.redisService.getRank(
        'celestine_ranking',
        orgName,
      );
      const result = { ...orgDataObj, celestine_ranking: newRank };
      return result;
    }
    const result = { ...orgDataObj, celestine_ranking: rank };
    return result;
  }
}
