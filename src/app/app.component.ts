import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Currency } from './models/currency';
import { StateService } from './services/state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  public currency$: Observable<Currency>;
  constructor(private stateService: StateService) {}
  ngOnInit(): void {
    this.stateService.updateProductsFromServer();
    this.currency$ = this.stateService.getActiveCurrency();
  }

  public changeCurrency(value: Currency) {
    this.stateService.setActiveCurrency(value);
  }
}
