import { switchMap } from 'rxjs/operators';
import { Product } from './../../../models/product.model';
import { ProductsService } from './../../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category',
  template: `<app-products [products]="products" (loadMore)="onLoadMore()"></app-products>`,
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent  implements OnInit{

  categoryId: string   | null = null;
  limit = 10;
  offset = 0;
  products: Product[] = [];
  showProductDetail = false;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ){}

  ngOnInit(): void {
    /*
    //Ejemplo de callback hell
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
      */
      this.route.paramMap
                        .pipe(
                          switchMap( params => {
                            this.categoryId = params.get('id');
                            if( this.categoryId  ){
                                    return this.productsService.getByCategory(this.categoryId, this.limit, this.offset)
                            }
                            return [];
                          })
                        )
                        .subscribe( (data) => {
                          this.products = data;
                        })
  }

  onLoadMore() {
    /*this.productsService.getAllProducts(this.limit, this.offset).subscribe((data) => {
      this.products = this.products.concat(data);
      this.offset += this.limit;
      console.log('hm olm');
    });*/
    if( this.categoryId  ){
      this.productsService.getByCategory(this.categoryId, this.limit, this.offset)
      .subscribe( data => {
        this.products = this.products.concat(data);
        this.offset += this.limit;
      })
      console.log('idcategoria ', this.categoryId);
    }
  }

}
