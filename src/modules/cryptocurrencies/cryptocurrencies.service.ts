import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { getTokenInfo } from './usecases/getDataFromCoingecko/getDataFromCoinGecko';

@Injectable()
export class CryptocurrenciesService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.cryptocurrency.findMany();
  }

  findOne(id: string) {
    return this.prisma.cryptocurrency.findUnique({
      where: { id },
    });
  }
  findByAddress(address: string) {
    return this.prisma.cryptocurrency.findFirst({
      where: { address },
    });
  }

  findByName(name: string) {
    return this.prisma.cryptocurrency.findFirst({
      where: { name },
    });
  }

  // update(id: number, updateCryptocurrencyInput: UpdateCryptocurrencyInput) {
  //   return `This action updates a #${id} cryptocurrency`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} cryptocurrency`;
  // }
}
