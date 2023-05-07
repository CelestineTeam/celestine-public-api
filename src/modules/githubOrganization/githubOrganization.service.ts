import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class GithubOrganizationService {
  constructor(private prisma: PrismaService) {}

  async findAllByOrgName(organization: string) {
    const result = await this.prisma.activeDevV2.findMany({
      where: {
        organization,
      },
    });
    return result;
  }
}
