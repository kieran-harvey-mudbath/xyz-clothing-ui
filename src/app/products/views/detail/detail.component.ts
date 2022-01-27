import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, filter, map, Observable, switchMap, tap } from 'rxjs';
import { Currency } from 'src/app/models/currency';
import { Product } from 'src/app/models/product';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  public product$: Observable<Product>;
  public currency$: Observable<Currency>;

  constructor(
    private stateService: StateService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currency$ = this.stateService.getActiveCurrency();

    this.product$ = combineLatest({
      params: this.route.params,
      products: this.stateService.getProducts(),
    }).pipe(
      filter((x) => x.products?.length > 0),
      // tap((x) => console.log(x)),
      switchMap((x) =>
        this.stateService.getProductById(Number(x.params['id']))
      ),
      // tap((x) => console.log(x)),
      map((product) => {
        if (!product) {
          this.router.navigateByUrl('/products');
        }
        this.stateService.setActiveProduct(product as Product);
        return product as Product;
      })
    );
  }
}
