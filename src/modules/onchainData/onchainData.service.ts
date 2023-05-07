import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class OnchainDataService {
  constructor(private prisma: PrismaService) {}
}
