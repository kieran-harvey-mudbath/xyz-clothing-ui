import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Currency } from 'src/app/models/currency';
import { Product } from 'src/app/models/product';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product;
  public currency$: Observable<Currency>;

  constructor(private stateService: StateService) {}

  ngOnInit(): void {
    this.currency$ = this.stateService.getActiveCurrency();
  }
}
