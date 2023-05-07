import { Module } from '@nestjs/common';
import { VestingsService } from './vestings.service';
import { VestingsResolver } from './vestings.resolver';

@Module({
  providers: [VestingsService, VestingsResolver],
})
export class VestingsModule {}
