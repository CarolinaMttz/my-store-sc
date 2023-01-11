import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product, CreateProductDTO, UpdateProductDTO } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = 'https://young-sands-07814.herokuapp.com/api/products';

  constructor(
    private http: HttpClient
  ) { }

  getAllProducts(){
      return this.http.get<Product[]>(this.apiUrl);
  }

  getProduct(id: string){ //Request para obtener el id en particular
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  create(dataDTO: CreateProductDTO){
    //La data que venga es la data que vamos a enviar en el cuerpo de la petición
    return this.http.post<Product>( this.apiUrl, dataDTO );
  }

  update(id: string, dataDTO: UpdateProductDTO){
    return this.http.put<Product>( `${this.apiUrl}/${id}`, dataDTO );
  }

  delete(id: string){
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }

}
