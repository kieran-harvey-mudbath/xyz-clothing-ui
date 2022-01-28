import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, filter, map, Observable, switchMap, tap } from 'rxjs';
import { ExchangeRates } from 'src/app/models/exchange-rates';
import { Product } from 'src/app/models/product';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {
  public form: FormGroup;
  public product$: Observable<Product>;
  public rates$: Observable<ExchangeRates[]>;

  constructor(
    private fb: FormBuilder,
    private stateService: StateService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.rates$ = this.stateService.getRates();
    this.form = this.fb.group({
      id: [null, [Validators.required]],
      name: [null, [Validators.required, Validators.minLength(3)]],
      description: [null, []],
      price: this.fb.group({
        base: [null, [Validators.required]],
        amount: [null, [Validators.required]],
      }),
      imageUrl: [null],
      relatedProducts: [null],
    });

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
      }),
      tap((product) => {
        this.form.get('description')?.patchValue(product.description);
        this.form.get('id')?.patchValue(product.id);
        this.form.get('imageUrl')?.patchValue(product.imageUrl);
        this.form.get('name')?.patchValue(product.name);
        this.form.get('price')?.patchValue(product.price);
        this.form.get('relatedProducts')?.patchValue(product.relatedProducts);
      })
    );
  }

  submitForm(data: FormGroup) {
    console.log(data);
  }
}
