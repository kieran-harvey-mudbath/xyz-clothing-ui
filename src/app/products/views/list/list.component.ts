import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  public products$: Observable<Product[]>;

  constructor(private stateService: StateService) {
    this.products$ = this.stateService.getProducts();
  }

  ngOnInit() {}
}
