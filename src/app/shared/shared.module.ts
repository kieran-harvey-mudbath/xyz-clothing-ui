import { CommonModule, CurrencyPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { CustomCurrencyPipe } from './custom-currency.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [CustomCurrencyPipe],
  exports: [CustomCurrencyPipe],
  providers: [CurrencyPipe],
})
export class SharedModule {}
