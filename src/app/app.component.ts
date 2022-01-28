import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Currency } from './models/currency';
import { ExchangeRates } from './models/exchange-rates';
import { StateService } from './services/state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  public currency$: Observable<Currency>;
  public rates$: Observable<ExchangeRates[]>;

  constructor(private stateService: StateService) {}
  ngOnInit(): void {
    this.currency$ = this.stateService.getActiveCurrency();
    this.rates$ = this.stateService.getRates();
  }

  public changeCurrency(value: Currency) {
    this.stateService.setActiveCurrency(value);
  }
}
