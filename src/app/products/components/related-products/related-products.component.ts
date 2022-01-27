import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationEnd } from '@angular/router';
import { filter, Observable, switchMap, tap } from 'rxjs';
import { Product } from 'src/app/models/product';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-related-products',
  templateUrl: './related-products.component.html',
  styleUrls: ['./related-products.component.scss'],
})
export class RelatedProductsComponent implements OnInit {
  public products$: Observable<Product[]>;

  constructor(private stateService: StateService) {}

  ngOnInit(): void {
    this.products$ = this.stateService.getActiveProduct().pipe(
      switchMap((active) => {
        if (!active) return [];
        return this.stateService.getRelatedProducts(active.id);
      })
      // tap(console.log)
    );
  }
}
