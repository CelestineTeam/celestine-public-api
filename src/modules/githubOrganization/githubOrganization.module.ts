import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { RedisService } from 'src/infra/redis.service';
import { GetGithubOrgDataByName } from './usecases/getGithubOrgData';
import { GithubOrganizationResolver } from './githubOrganization.resolver';
import { GithubOrganizationService } from './githubOrganization.service';

@Module({
  providers: [
    PrismaService,
    RedisService,
    GithubOrganizationResolver,
    GithubOrganizationService,
    GetGithubOrgDataByName,
  ],
})
export class GithubOrganizationModule {}
