import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Product, CreateProductDTO, UpdateProductDTO } from '../models/product.model';
import { retry, retryWhen, catchError, map} from 'rxjs/operators';
import { environment } from './../../environments/environments';
import { pipe, throwError, zip } from 'rxjs';
import { checkTime } from './../interceptors/time.interceptor';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = 'https://young-sands-07814.herokuapp.com/api/products'; //Inicial
  //private apiUrl = 'https://young-sands-07814.herokuappapp.com/api/products'; //Para la clase reintentar una petición
  //private apiUrl = '/api/products'; //Para la clase de CORS
  //private apiUrl = `${environment.API_URL}/api/products`; //Clase manejo ambientes clase 12
  private apiUrlCategory = 'https://young-sands-07814.herokuapp.com/api/categories';

  constructor(
    private http: HttpClient
  ) { }

  /*getAllProducts(){
      return this.http.get<Product[]>(this.apiUrl);
  }*/

  getAllProducts(limit?: number, offset?: number){
    let params = new HttpParams();
    if(limit && offset != null ){
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Product[]>(this.apiUrl, {params, context: checkTime() })
    .pipe(
      retry(3),
      map(products => products.map(item => {
        return {
          ...item,
          taxes: .19 * item.price
        }
      }))
    );
  }

  getProduct(id: string){ //Request para obtener el id en particular
    return this.http.get<Product>(`${this.apiUrl}/${id}`)
    .pipe(
      catchError( (error: HttpErrorResponse) => {
        if(error.status === HttpStatusCode.Conflict ){ //Error 409
          return throwError('Algo está fallando en el servidor');
        }
        if(error.status === HttpStatusCode.NotFound ){ //Error 404
          return throwError('El producto no fue encontrado');
        }
        if(error.status === HttpStatusCode.Unauthorized ){ //Error 404
          return throwError('No estás autorizado');
        }
        return throwError('Ups! algo salió mal');
      } )
    )
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

  fetchReadAndUpdate(id: string, dto: UpdateProductDTO){
    return zip(
      this.getProduct(id),
      this.update(id, dto)
    )
  }

  getByCategory( categoryId: string, limit?: number, offset?: number ){
    let params = new HttpParams();
    if(limit && offset != null ){
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }

    return this.http.get<Product[]>( `${this.apiUrlCategory}/${categoryId}/products`, {params});
  }


  getOne(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/${id}`)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.Conflict) {
          return throwError('Algo está fallando en el server');
        }
        if (error.status === HttpStatusCode.NotFound) {
          return throwError('El producto no existe');
        }
        if (error.status === HttpStatusCode.Unauthorized) {
          return throwError('No estás permitido');
        }
        return throwError('Ups algo salió mal');
      })
    )
  }

}
