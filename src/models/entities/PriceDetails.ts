export type SupportedCurrency = 'EGP' | 'USD';

export type PriceDetails = {
  currency: SupportedCurrency;
  original: number;
  discountPercentage: number | undefined;
};
