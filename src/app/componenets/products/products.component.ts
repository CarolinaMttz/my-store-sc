import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { StoreService } from '../../services/store.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{

  myShoppingCar: Product[] = [];
  total = 0;
  products: Product[] = [];
  today = new Date();
  date = new Date(2020, 1, 23);
  showProductDetail = false;
  productChoosen: Product = {
    id: '',
    title: '',
    price: 0,
    images: [],
    description: '',
    category: {
      id: '',
      name: ''
    }
  }

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
    ){
    this.myShoppingCar = this.storeService.getShoppingCar();
  }

  ngOnInit(): void {
    this.productsService.getAllProducts()
    .subscribe( data => {
      console.log(data);
      this.products = data;
    });
  }

  onAddToShoppingCar(product: Product){
      /*console.log('Producto ',product);
      this.myShoppingCar.push(product);
      this.total =  this.myShoppingCar.reduce( (sum, item) => sum + item.price, 0 );*/
      this.storeService.addProduct( product );
      this.total = this.storeService.getTotal();
  }

  toogleProductDetails(){
    this.showProductDetail = !this.showProductDetail;
  }


  onShowDetail(id: string){
      //console.log("id => ",id);
      this.productsService.getProduct(id)
                          .subscribe(data => {
                              this.toogleProductDetails();
                              //console.log("producto => ",data);
                              this.productChoosen = data;
                          });
  }

}
