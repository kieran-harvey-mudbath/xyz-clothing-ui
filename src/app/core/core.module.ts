import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Page404Component } from './page404/page404.component';
import { LayoutComponent } from './layout/layout.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    //
    Page404Component,
    LayoutComponent,
  ],
  exports: [
    //
    Page404Component,
    LayoutComponent,
  ],
})
export class CoreModule {}
