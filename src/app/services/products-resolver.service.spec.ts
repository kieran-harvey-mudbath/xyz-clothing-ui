import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ExchangeService } from './exchange.service';

import { ProductsResolverService } from './products-resolver.service';
import { ProductsService } from './products.service';
import { StateService } from './state.service';

describe('ProductsResolverService', () => {
  let service: ProductsResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StateService, ProductsService, ExchangeService],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ProductsResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
