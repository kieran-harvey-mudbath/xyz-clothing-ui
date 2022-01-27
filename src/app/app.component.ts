import { Component } from '@angular/core';
import { StateService } from './services/state.service';

@Component({
  selector: 'app-root',
  template: '<app-layout><router-outlet></router-outlet><app-layout>',
})
export class AppComponent {
  title = 'xyz-clothing';
  constructor(private stateService: StateService) {
    this.stateService.updateProductsFromServer();
  }
}
