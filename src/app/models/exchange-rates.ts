import { Currency } from './currency';

export interface ExchangeRates {
  base: Currency;
  rates: { [key: string]: number };
}
