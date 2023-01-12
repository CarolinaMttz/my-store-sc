import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Product, CreateProductDTO, UpdateProductDTO } from '../models/product.model';
import { retry, retryWhen} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  //private apiUrl = 'https://young-sands-07814.herokuapp.com/api/products';
  //private apiUrl = 'https://young-sands-07814.herokuappapp.com/api/products';
  private apiUrl = '/api/products';

  constructor(
    private http: HttpClient
  ) { }

  /*getAllProducts(){
      return this.http.get<Product[]>(this.apiUrl);
  }*/

  getAllProducts(limit?: number, offset?: number){
    let params = new HttpParams();
    if(limit && offset){
      params = params.set('limit', limit);
      params = params.set('offset', limit);
    }
    return this.http.get<Product[]>(this.apiUrl, {params});
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

  getProductsByPage(limit: number, offset: number){
    return this.http.get<Product[]>(this.apiUrl,{
        params: { limit, offset }
    }).pipe(
      retry(3)
    );
  }

}
