import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './views/detail/detail.component';
import { EditProductComponent } from './views/edit-product/edit-product.component';
import { ListComponent } from './views/list/list.component';

const routes: Routes = [
  //
  { path: '', component: ListComponent },
  { path: ':id', component: DetailComponent },
  { path: ':id/edit', component: EditProductComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
