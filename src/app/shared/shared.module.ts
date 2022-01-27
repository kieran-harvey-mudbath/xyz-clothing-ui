import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CurrencyPickerComponent } from './currency-picker/currency-picker.component';
import { CustomCurrencyPipe } from './custom-currency.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [CurrencyPickerComponent, CustomCurrencyPipe],
  exports: [CustomCurrencyPipe],
  providers: [CurrencyPipe],
})
export class SharedModule {}
