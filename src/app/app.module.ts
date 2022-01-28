import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ProductsModule } from './products/products.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { ExchangeService } from './services/exchange.service';
import { ProductsService } from './services/products.service';
import { StateService } from './services/state.service';

@NgModule({
  declarations: [
    //
    AppComponent,
  ],
  imports: [
    //
    AppRoutingModule,
    BrowserModule,
    CoreModule,
    HttpClientModule,
    NgbModule,
    ProductsModule,
  ],
  providers: [
    StateService,
    ProductsService,
    ExchangeService,
    {
      provide: APP_INITIALIZER,
      useFactory: (stateService: StateService) => () => {
        return stateService.updateExchangeRatesFromServer();
      },
      deps: [StateService, ProductsService, ExchangeService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
