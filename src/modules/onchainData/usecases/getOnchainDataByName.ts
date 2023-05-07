import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class GetOnchainDataByName {
  constructor(private prisma: PrismaService) {}
  async execute(tokenName: string): Promise<object> {
    const tokenNameLowerCase = tokenName.toLowerCase();
    const allocation = await this.prisma.allocation.findFirst({
      where: { tokenName: tokenNameLowerCase },
    });
    const name = allocation.tokenName;
    const nameUppercase =
      tokenName.charAt(0).toUpperCase() + tokenName.slice(1).toLowerCase();
    const usageMetricsDailySnapshots =
      await this.prisma.usageMetricsDailySnapshots.findFirst({
        where: { tokenName },
      });
    const dailyIncomeData = await this.prisma.dailyIncome.findFirst({
      where: { tokenName: nameUppercase },
    });
    const dailyIncome = dailyIncomeData ?? null;
    const cumulativeIncomeData = await this.prisma.cumulativeIncome.findFirst({
      where: { tokenName: nameUppercase },
    });
    const cumulativeIncome = cumulativeIncomeData ?? null;

    const result = {
      name,
      allocation,
      usageMetricsDailySnapshots,
      dailyIncome,
      cumulativeIncome,
    };
    return result;
  }
}
