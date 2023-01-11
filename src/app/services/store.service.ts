import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private myShoppingCar: Product[] = [];

  /* en la linea 12 y 13: es un ESTADO COMPARTIDO para el array
  de los productos que estoy añadiendo al carrito */
  private myCar = new BehaviorSubject<Product[]>([]);
  myCar$ = this.myCar.asObservable();

 


  addProduct(product: Product){
    this.myShoppingCar.push(product);
    this.myCar.next(this.myShoppingCar);
  }

  getShoppingCar(){
    return this.myShoppingCar;
  }

  getTotal(){
    return this.myShoppingCar.reduce( (sum, item) => sum + item.price, 0 );
  }

}
