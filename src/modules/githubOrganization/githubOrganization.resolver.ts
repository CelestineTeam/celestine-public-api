import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql';
import { GithubOrganizationService } from './githubOrganization.service';
import { ActiveDev, GitHubOrganization } from 'src/graphql';
import { GetGithubOrgDataByName } from './usecases/getGithubOrgData';
import { InternalServerErrorException } from '@nestjs/common';

@Resolver('GitHubOrganization')
export class GithubOrganizationResolver {
  constructor(
    private readonly githubOrganizationService: GithubOrganizationService,
    private readonly getGithubOrgDataByName: GetGithubOrgDataByName,
  ) {}

  @Query(() => GitHubOrganization)
  async getDevDataByOrgName(
    @Args('name') name: string,
  ): Promise<GitHubOrganization> {
    try {
      const orgData = await this.getGithubOrgDataByName.execute(name);
      return orgData;
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to retrieve ActiveDev for ${name}: ${error.message}`,
      );
    }
  }

  @ResolveField(() => [ActiveDev])
  async active_dev(
    @Parent() gitHubOrganization: GitHubOrganization,
  ): Promise<ActiveDev[]> {
    const { org_name } = gitHubOrganization;
    try {
      const activeDev = await this.githubOrganizationService.findAllByOrgName(
        org_name,
      );
      return activeDev;
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to retrieve ActiveDev for ${org_name}: ${error.message}`,
      );
    }
  }
}
