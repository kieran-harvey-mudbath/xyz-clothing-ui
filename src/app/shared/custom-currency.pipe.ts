import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { Currency } from '../models/currency';
import { Price } from '../models/price';

@Pipe({
  name: 'customCurrency',
})
export class CustomCurrencyPipe implements PipeTransform {
  constructor(private cp: CurrencyPipe) {}

  transform(price: Price, ...args: unknown[]) {
    const toCurrency: Currency = args[0] as Currency;

    let value = price.amount;
    let factor = 1;

    if (price.base === 'AUD' && toCurrency === 'USD') {
      factor = 0.7;
    } else if (price.base === 'AUD' && toCurrency === 'CNY') {
      factor = 4.48;
    } else if (price.base === 'USD' && toCurrency === 'AUD') {
      factor = 1.42;
    } else if (price.base === 'USD' && toCurrency === 'CNY') {
      factor = 6.37;
    } else if (price.base === 'CNY' && toCurrency === 'AUD') {
      factor = 0.22;
    } else if (price.base === 'CNY' && toCurrency === 'USD') {
      factor = 0.16;
    } else {
      factor = 1;
    }

    return this.cp.transform(value * factor, `${toCurrency}`);
  }
}
