import { Component, OnInit, Input } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  limit = 10;
  offset = 0;
  @Input() products: Product[] = [];

  constructor(
    private productsService: ProductsService
    ){ }

  ngOnInit(): void {
    this.productsService.getAllProducts(10, 0)
        .subscribe( data => {
          this.products = data;
          this.offset += this.limit;
        });
  }

  loadMore(){
    this.productsService.getProductsByPage(this.limit, this.offset)
    .subscribe( data => {
      this.products = this.products.concat(data);
      this.offset  += this.limit;
    });
  }
}
