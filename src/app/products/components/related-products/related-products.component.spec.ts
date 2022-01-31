import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsService } from 'src/app/services/products.service';
import { StateService } from 'src/app/services/state.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { RelatedProductsComponent } from './related-products.component';
import { ExchangeService } from 'src/app/services/exchange.service';

describe('RelatedProductsComponent', () => {
  let component: RelatedProductsComponent;
  let fixture: ComponentFixture<RelatedProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [RelatedProductsComponent],
      providers: [StateService, ProductsService, ExchangeService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatedProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
