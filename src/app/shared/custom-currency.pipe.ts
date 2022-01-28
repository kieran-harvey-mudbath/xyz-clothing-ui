import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { Currency } from '../models/currency';
import { Price } from '../models/price';
import { StateService } from '../services/state.service';

@Pipe({
  name: 'customCurrency',
})
export class CustomCurrencyPipe implements PipeTransform {
  constructor(private cp: CurrencyPipe, private stateService: StateService) {}

  transform(price: Price, ...args: unknown[]) {
    const toCurrency: Currency = args[0] as Currency;

    let value = price.amount;
    let factor = 1;
    if (toCurrency !== price.base) {
      const exchange = this.stateService
        .getCurrentRates()
        .find((x) => x.base === price.base);

      if (!exchange) {
        throw new Error('Could not find exchange');
      }

      factor = exchange.rates[toCurrency];
    }

    return this.cp.transform(value * factor, `${toCurrency}`);
  }
}
