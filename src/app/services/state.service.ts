import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  distinctUntilChanged,
  firstValueFrom,
  map,
  Observable,
} from 'rxjs';
import { Currency } from '../models/currency';
import { Product } from '../models/product';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private subject = new BehaviorSubject<SimpleSate>({
    products: [],
    activeCurrency: 'AUD',
  });
  constructor(private productsService: ProductsService) {}

  public async updateProductsFromServer() {
    const products = await firstValueFrom(this.productsService.getProducts());
    const state = { ...this.subject.getValue() };
    state.products = products;
    this.subject.next(state);
  }

  public getProducts(): Observable<Product[]> {
    return this.subject.pipe(
      map((x) => x.products),
      distinctUntilChanged()
    );
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
  activeProduct?: Product;
  activeCurrency: Currency;
}
