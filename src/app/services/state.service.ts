import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  distinctUntilChanged,
  firstValueFrom,
  map,
  Observable,
} from 'rxjs';
import { Product } from '../models/product';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private subject = new BehaviorSubject<SimpleSate>({ products: [] });
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
}

interface SimpleSate {
  products: Product[];
}
