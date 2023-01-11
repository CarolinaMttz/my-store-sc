import { Component, OnInit } from '@angular/core';
import { Product, CreateProductDTO, UpdateProductDTO } from '../../models/product.model';
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

  createNewProduct(){
    const product: CreateProductDTO = {
      title: 'Nuevo producto',
      price: 120,
      images: ['https://i.pinimg.com/736x/99/0a/95/990a95804d42ae98dcefcf5a7632b846.jpg'],
      description: 'Hola soy un nuevo producto',
      categoryId: 1
    }
    this.productsService.create( product )
                        .subscribe(data => {
                          //console.log("createNewProduct => ",data);
                          this.products.unshift(data);
                        });
  }

  updateProduct(){
    const changes: UpdateProductDTO = { //no es necesario el tipado
      title: 'Titulo actualizado',
    }
    const idProd = this.productChoosen.id;
    this.productsService.update( idProd, changes )
                        .subscribe(data => {
                          //console.log("updateProduct => ",data);
                          const productIndex =  this.products.findIndex( item => item.id === this.productChoosen.id );
                          this.products[productIndex] = data;
                          this.productChoosen = data;// con esto se actualiza la info en el slide, sin necesidad de cerrar
                          //luego de actualizar y luego volve abrir
                        });

  }

  deleteProduct(){
    const id = this.productChoosen.id;
    this.productsService.delete(id)
                        .subscribe(()=> {
                            const productIndex =  this.products.findIndex( item => item.id === this.productChoosen.id );
                            this.products.splice( productIndex, 1 );
                            this.showProductDetail = false; //para cerrar el panel lateral
                        });

  }


}
