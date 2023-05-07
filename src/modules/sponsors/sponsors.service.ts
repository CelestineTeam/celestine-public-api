import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class SponsorsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.sponsor.findMany();
  }

  findOne(id: string) {
    return this.prisma.sponsor.findUnique({
      where: { id },
    });
  }

  findByToken(token: string) {
    return this.prisma.sponsor.findFirst({
      where: { token },
    });
  }

  findAllByToken(token: string) {
    return this.prisma.sponsor.findMany({
      where: { token },
    });
  }
}
