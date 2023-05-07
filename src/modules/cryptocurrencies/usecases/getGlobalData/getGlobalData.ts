import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { GlobalData } from 'src/graphql';
import { RedisService } from 'src/infra/redis.service';

@Injectable()
export class GetGlobalData {
  constructor(private readonly redisService: RedisService) {}

  async getNasdaqVolume(): Promise<number> {
    const redisKey = 'global:nasdaq';
    const volumeData = await this.redisService.getValue(redisKey);
    if (!volumeData) {
      const url = 'https://query1.finance.yahoo.com/v7/finance/chart/%5EIXIC';
      const params = { interval: '1d', range: '1d' };
      try {
        const response = await axios.get(url, { params });
        const volumeData =
          response.data.chart.result[0].indicators.quote[0].volume;
        await this.redisService.setValue(
          redisKey,
          volumeData[volumeData.length - 1],
          300000,
        );

        return volumeData[volumeData.length - 1];
      } catch (error) {
        console.error('Failed to fetch Nasdaq Composite volume', error);
        throw new Error('Failed to fetch Nasdaq Composite volume');
      }
    }
    return Number(volumeData);
  }

  async getCryptoVolume(): Promise<number> {
    const redisKey = 'global:crypto';
    const volumeData = await this.redisService.getValue(redisKey);
    if (!volumeData) {
      const url = 'https://api.coingecko.com/api/v3/global';

      try {
        const response = await axios.get(url);
        const globalData = response.data.data;
        await this.redisService.setValue(
          redisKey,
          globalData.total_volume.usd,
          300000,
        );
        return globalData.total_volume.usd;
      } catch (error) {
        console.error('Error fetching global data:', error);
        throw new Error('Failed to fetch crypto market data');
      }
    }
    return Number(volumeData);
  }

  async execute(): Promise<GlobalData> {
    const [currentNasdaqVolume, currentCryptoVolume] = await Promise.all([
      this.getNasdaqVolume(),
      this.getCryptoVolume(),
    ]);

    return { currentNasdaqVolume, currentCryptoVolume };
  }
}
