import { Component } from '@angular/core';
import { StateService } from './services/state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'xyz-clothing';
  constructor(private stateService: StateService) {
    this.stateService.updateProductsFromServer();
  }
}
