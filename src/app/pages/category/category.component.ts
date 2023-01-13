import { Product } from './../../models/product.model';
import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent  implements OnInit{

  categoryId: string   | null = null;
  limit = 10;
  offset = 0;
  products: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ){}

  ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
        this.categoryId = params.get('id');
        if( this.categoryId  ){
          this.productsService.getByCategory(this.categoryId, this.limit, this.offset)
          .subscribe( data => {
            this.products = data;
          })
          console.log('idcategoria ', this.categoryId);
        }
      });
  }

  onLoadMore() {
    this.productsService.getAllProducts(this.limit, this.offset).subscribe((data) => {
      this.products = this.products.concat(data);
      this.offset += this.limit;
      console.log('hm olm');
    });
  }

}
