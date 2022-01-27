import { NgModule, Optional, SkipSelf } from '@angular/core';
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
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        `${parentModule.constructor.name} has already been loaded. Import this module in the AppModule only.`
      );
    }
  }
}
