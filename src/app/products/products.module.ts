import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ListComponent } from './views/list/list.component';
import { DetailComponent } from './views/detail/detail.component';
import { RelatedProductsComponent } from './components/related-products/related-products.component';
import { SharedModule } from '../shared/shared.module';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { EditProductComponent } from './views/edit-product/edit-product.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    //
    ListComponent,
    DetailComponent,
    RelatedProductsComponent,
    ProductCardComponent,
    EditProductComponent,
  ],
  imports: [
    //
    CommonModule,
    ProductsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class ProductsModule {}
