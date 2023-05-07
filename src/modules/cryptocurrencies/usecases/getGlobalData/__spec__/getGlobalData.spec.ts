import { Test, TestingModule } from '@nestjs/testing';
import { GetGlobalData } from '../getGlobalData';
import { PrismaService } from 'prisma/prisma.service';

describe('GetGlobalData', () => {
  let service: GetGlobalData;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetGlobalData, PrismaService],
    }).compile();

    service = module.get<GetGlobalData>(GetGlobalData);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(async () => {
    await prismaService.$disconnect();
  });

  it('should fetch and return global data', async () => {
    jest.spyOn(service, 'getNasdaqVolume').mockResolvedValue(100);
    jest.spyOn(service, 'getCryptoVolume').mockResolvedValue(200);
    jest.spyOn(service, 'getTvlItems').mockResolvedValue([
      { date: '2022-04-07', value: 300 },
      { date: '2022-04-06', value: 400 },
    ]);

    const result = await service.execute();

    expect(result.currentNasdaqVolume).toEqual(100);
    expect(result.currentCryptoVolume).toEqual(200);
    expect(result.tvlItems).toEqual([
      { date: '4/7/2022', value: 300 },
      { date: '4/6/2022', value: 400 },
    ]);
  });

  it('should throw an error when failed to fetch Nasdaq Composite volume', async () => {
    jest
      .spyOn(service, 'getNasdaqVolume')
      .mockRejectedValue(new Error('Failed to fetch Nasdaq Composite volume'));

    await expect(service.execute()).rejects.toThrow(
      new Error('Failed to fetch Nasdaq Composite volume'),
    );
  });

  it('should throw an error when failed to fetch crypto market data', async () => {
    jest
      .spyOn(service, 'getCryptoVolume')
      .mockRejectedValue(new Error('Failed to fetch crypto market data'));

    await expect(service.execute()).rejects.toThrow(
      new Error('Failed to fetch crypto market data'),
    );
  });

  it('should throw an error when failed to fetch Total Value Locked data', async () => {
    jest
      .spyOn(service, 'getTvlItems')
      .mockRejectedValue(new Error('Failed to fetch Total Value Locked data'));

    await expect(service.execute()).rejects.toThrow(
      new Error('Failed to fetch Total Value Locked data'),
    );
  });
});
