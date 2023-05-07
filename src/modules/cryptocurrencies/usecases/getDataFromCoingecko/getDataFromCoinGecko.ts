import axios from 'axios';

export interface TokenInfo {
  name: string;
  symbol: string;
  address: string;
  category: string[];
  platform: {
    name: string;
    address: string;
    imageUrl: string | '';
  }[];
  image: {
    thumb: string;
    small: string;
    large: string;
    transparent: string;
  };
}

const COINGECKO_API_BASE_URL = 'https://api.coingecko.com/api/v3';

const tokenNameMappings = {
  'optimistic-ethereum': 'optimism',
  'arbitrum-one': 'arbitrum',
  'polygon-pos': 'matic-network',
  avalanche: 'avalanche-2',
  'near-protocol': 'near',
  'binance-smart-chain': 'binancecoin',
  'harmony-shard-0': 'harmony',
};

function matchTokenId(
  tokenName: string,
  mappings: Record<string, string>,
): string {
  if (tokenName in mappings) {
    return mappings[tokenName];
  }
  return tokenName;
}

async function getImageUrl(tokenId: string): Promise<string | null> {
  const matchingTokenId = matchTokenId(tokenId, tokenNameMappings);

  try {
    const response = await axios.get(
      `${COINGECKO_API_BASE_URL}/coins/${matchingTokenId}`,
      {
        params: {
          localization: false,
          tickers: false,
          market_data: true,
          community_data: false,
          developer_data: false,
          sparkline: false,
        },
      },
    );

    const { image } = response.data;
    const imageUrl = image.large;
    return imageUrl;
  } catch (error) {
    console.error(`Error fetching image URL for ${tokenId}: ${error}`);
    return null;
  }
}

async function convertPlatformData(platform: Record<string, string>): Promise<{
  platform: { name: string; address: string; imageUrl: string }[];
}> {
  const data = await Promise.all(
    Object.entries(platform).map(async ([name, address]) => ({
      name,
      address,
      imageUrl: await getImageUrl(name),
    })),
  );
  return { platform: data };
}

export async function getTokenInfo(tokenId: string): Promise<TokenInfo> {
  const response = await axios.get(
    `${COINGECKO_API_BASE_URL}/coins/${tokenId}`,
    {
      params: {
        localization: false,
        tickers: false,
        market_data: true,
        community_data: false,
        developer_data: false,
        sparkline: false,
      },
    },
  );

  const {
    name,
    symbol,
    contract_address: address,
    platforms,
    image,
  } = response.data;

  const platformObj = await convertPlatformData(platforms);

  const tokenInfo: TokenInfo = {
    name,
    symbol,
    address,
    category: response.data.categories,
    platform: platformObj.platform,
    image: {
      thumb: image.thumb,
      small: image.small,
      large: image.large,
      transparent: image.large
        .replace('/large/', '/thumb/')
        .replace('.png', '.svg'),
    },
  };

  return tokenInfo;
}
