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

  /*
  products: Product[] = [
    {
      id: '1',
      name: 'El mejor juguete',
      price: 565,
      image: './assets/images/toy.jpg'
    },
    {
      id: '2',
      name: 'Bicicleta casi nueva',
      price: 356,
      image: './assets/images/bike.jpg'
    },
    {
      id: '3',
      name: 'Colleción de albumenes',
      price: 34,
      image: './assets/images/album.jpg'
    },
    {
      id: '4',
      name: 'Mis libros',
      price: 23,
      image: './assets/images/books.jpg'
    },
    {
      id: '5',
      name: 'Casa para perro',
      price: 34,
      image: './assets/images/house.jpg'
    },
    {
      id: '6',
      name: 'Gafas',
      price: 465,
      image: './assets/images/glasses.jpg'
    }
  ];
  */

  products: Product[] = [];
  today = new Date();
  date = new Date(2020, 1, 23);


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

}
