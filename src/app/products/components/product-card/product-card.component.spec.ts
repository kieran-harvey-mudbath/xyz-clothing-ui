import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExchangeService } from 'src/app/services/exchange.service';
import { ProductsService } from 'src/app/services/products.service';
import { StateService } from 'src/app/services/state.service';
import { CustomCurrencyPipe } from 'src/app/shared/custom-currency.pipe';
import { SharedModule } from 'src/app/shared/shared.module';

import { ProductCardComponent } from './product-card.component';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductCardComponent],
      providers: [
        StateService,
        ProductsService,
        ExchangeService,
        CustomCurrencyPipe,
      ],
      imports: [HttpClientTestingModule, SharedModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    component.product = {
      id: 1,
      name: 'name',
      description: 'description',
      price: { amount: 15.99, base: 'AUD' },
      imageUrl: 'imageUrl',
      relatedProducts: [],
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
