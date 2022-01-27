import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  constructor(private productsService: ProductsService) {}

  async ngOnInit() {
    const products = await firstValueFrom(this.productsService.getProducts());
    console.log(products);
  }
}
