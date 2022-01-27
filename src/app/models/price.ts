import { Currency } from './currency';

export interface Price {
  base: Currency;
  amount: number;
}
