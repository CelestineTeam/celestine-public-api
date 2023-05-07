
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreateCryptocurrencyInput {
    address?: Nullable<string>;
    name?: Nullable<string>;
    symbol?: Nullable<string>;
    category?: Nullable<JSON>;
    platform?: Nullable<JSON>;
    createdAt?: Nullable<DateTime>;
}

export class UpdateCryptocurrencyInput {
    id: number;
}

export class Cryptocurrency {
    id: string;
    address?: Nullable<string>;
    name?: Nullable<string>;
    symbol?: Nullable<string>;
    category?: Nullable<Nullable<string>[]>;
    platform?: Nullable<JSON>;
    imageUrl?: Nullable<string>;
    tvl?: Nullable<number>;
    cryptocurrencyChanges?: Nullable<CryptocurrencyChanges>;
    sponsorData?: Nullable<Nullable<Sponsor>[]>;
    tvlHistorical?: Nullable<TvlHistorical>;
}

export class TvlHistorical {
    tokenName: string;
    data?: Nullable<JSON>;
}

export abstract class IQuery {
    abstract getAllCryptocurrencies(): Nullable<Cryptocurrency>[] | Promise<Nullable<Cryptocurrency>[]>;

    abstract getCryptocurrencyByName(name: string): Nullable<Cryptocurrency> | Promise<Nullable<Cryptocurrency>>;

    abstract getGlobalMarketData(): Nullable<GlobalData> | Promise<Nullable<GlobalData>>;

    abstract getDevDataByOrgName(name: string): Nullable<GitHubOrganization> | Promise<Nullable<GitHubOrganization>>;

    abstract getOnchainDataByName(name: string): Nullable<OnchainData> | Promise<Nullable<OnchainData>>;
}

export class CryptocurrencyChanges {
    address?: Nullable<string>;
    name?: Nullable<string>;
    price?: Nullable<number>;
    price_change_24h?: Nullable<number>;
    price_change_7d?: Nullable<number>;
    fdv?: Nullable<number>;
    fdv_percent_change_24h?: Nullable<number>;
    market_cap?: Nullable<number>;
    market_cap_change_24h?: Nullable<number>;
    volume?: Nullable<number>;
    volume_change_24h?: Nullable<number>;
    total_supply?: Nullable<number>;
    createdAt?: Nullable<DateTime>;
}

export class TvlItem {
    date?: Nullable<string>;
    value?: Nullable<number>;
}

export class GlobalData {
    currentNasdaqVolume?: Nullable<number>;
    currentCryptoVolume?: Nullable<number>;
}

export class GitHubOrganization {
    org_name?: Nullable<string>;
    all_stars?: Nullable<number>;
    all_forks?: Nullable<number>;
    all_commits?: Nullable<number>;
    people?: Nullable<number>;
    most_forked_repository?: Nullable<JSON>;
    most_stared_repository?: Nullable<JSON>;
    most_watched_repository?: Nullable<JSON>;
    programming_language_ratio?: Nullable<JSON>;
    celestine_score?: Nullable<number>;
    celestine_ranking?: Nullable<number>;
    active_dev?: Nullable<Nullable<ActiveDev>[]>;
}

export class ActiveDev {
    organization?: Nullable<string>;
    date?: Nullable<string>;
    dev_count?: Nullable<number>;
    dev_list?: Nullable<JSON>;
}

export class CumulativeIncome {
    id: string;
    tokenName?: Nullable<string>;
    data?: Nullable<Nullable<IncomeItem>[]>;
}

export class IncomeItem {
    date?: Nullable<number>;
    fees?: Nullable<number>;
    revenue?: Nullable<number>;
}

export class DailyIncome {
    id: string;
    tokenName?: Nullable<string>;
    data?: Nullable<Nullable<IncomeItem>[]>;
}

export class OnchainData {
    name: string;
    allocation?: Nullable<Allocation>;
    usageMetricsDailySnapshots?: Nullable<UsageMetricsDailySnapshots>;
    dailyIncome?: Nullable<DailyIncome>;
    cumulativeIncome?: Nullable<CumulativeIncome>;
}

export class Allocation {
    id: string;
    tokenName?: Nullable<string>;
    data?: Nullable<Nullable<AllocationItem>[]>;
}

export class AllocationItem {
    name?: Nullable<string>;
    amount?: Nullable<number>;
    percentage?: Nullable<number>;
}

export class UsageMetricsDailySnapshots {
    tokenName?: Nullable<string>;
    data?: Nullable<Nullable<UsageMetricItem>[]>;
}

export class UsageMetricItem {
    dailyActiveUsers?: Nullable<number>;
    dailyTransactionCount?: Nullable<number>;
    blockNumber?: Nullable<number>;
}

export class Sponsor {
    id: string;
    token?: Nullable<string>;
    leadInvestor?: Nullable<string>;
    otherInvestor?: Nullable<string>;
    amountRaised?: Nullable<number>;
    round?: Nullable<string>;
    timeStamp?: Nullable<number>;
    date?: Nullable<DateTime>;
    createdAt?: Nullable<DateTime>;
}

export type DateTime = any;
export type JSON = any;
type Nullable<T> = T | null;
