import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  distinctUntilChanged,
  firstValueFrom,
  map,
  Observable,
} from 'rxjs';
import { environment } from 'src/environments/environment';
import { Currency } from '../models/currency';
import { ExchangeRates } from '../models/exchange-rates';
import { Product } from '../models/product';
import { ExchangeService } from './exchange.service';
import { ProductsService } from './products.service';

// @Injectable({ providedIn: 'root' })
@Injectable()
export class StateService {
  private subject = new BehaviorSubject<SimpleSate>({
    products: [],
    rates: [],
    activeCurrency: environment.defaultCurrency,
  });
  constructor(
    private productsService: ProductsService,
    private exchangeService: ExchangeService
  ) {}

  public async updateProductsFromServer() {
    const products = await firstValueFrom(this.productsService.getProducts());
    const state = { ...this.subject.getValue() };
    state.products = products;
    this.subject.next(state);
  }

  public async updateExchangeRatesFromServer() {
    const rates = await firstValueFrom(this.exchangeService.getRates());
    const state = { ...this.subject.getValue() };
    state.rates = rates;
    this.subject.next(state);
  }

  public getProducts(): Observable<Product[]> {
    return this.subject.pipe(
      map((x) => x.products),
      distinctUntilChanged()
    );
  }

  public getRates(): Observable<ExchangeRates[]> {
    return this.subject.pipe(
      map((x) => x.rates),
      distinctUntilChanged()
    );
  }

  public getCurrentRates(): ExchangeRates[] {
    return [...this.subject.getValue().rates];
  }

  /**
   * This should be in the service but as we only store data locally it is here
   * @returns
   */
  public getRelatedProducts(id: number): Observable<Product[]> {
    return this.subject.pipe(
      map((x) =>
        x.products.filter((product) =>
          product.relatedProducts.find((relatedId) => id === relatedId)
        )
      ),
      distinctUntilChanged()
    );
  }

  /**
   * This should be in the service but as we only store data locally it is here
   * @returns
   */
  public getProductById(id: number): Observable<Product | null> {
    return this.subject.pipe(
      // tap((x) => console.log(x)),
      map((x) => x.products.find((product) => product.id === id) || null),
      // tap((x) => console.log(x)),
      distinctUntilChanged()
    );
  }

  public setActiveProduct(product: Product): void {
    const state = { ...this.subject.getValue() };
    state.activeProduct = product;
    this.subject.next(state);
  }

  public getActiveProduct(): Observable<Product | null> {
    return this.subject.pipe(
      map((x) => x.activeProduct || null),
      distinctUntilChanged()
    );
  }

  public getActiveCurrency(): Observable<Currency> {
    return this.subject.pipe(
      map((x) => x.activeCurrency),
      distinctUntilChanged()
    );
  }

  public setActiveCurrency(value: Currency): void {
    const state = { ...this.subject.getValue() };
    state.activeCurrency = value;
    this.subject.next(state);
  }
}

interface SimpleSate {
  products: Product[];
  rates: ExchangeRates[];
  activeProduct?: Product;
  activeCurrency: Currency;
}
