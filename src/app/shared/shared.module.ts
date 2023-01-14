import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImgComponent } from './components/img/img.component';
import { ProductComponent } from './components/product/product.component';
import { ProductsComponent } from './components/products/products.component';
import { ReversePipe } from './pipes/reverse.pipe';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { VocalesPipe } from './pipes/vocales.pipe';
import { HighlightDirective } from './directives/highlight.directive';
import { RouterModule } from '@angular/router';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  declarations: [
    ImgComponent,
    ProductComponent,
    ProductsComponent,
    ReversePipe,
    TimeAgoPipe,
    VocalesPipe,
    HighlightDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    SwiperModule
  ],
  exports: [
    //Aqui van los componentes que se desean compartir
    ImgComponent,
    ProductComponent,
    ProductsComponent,
    ReversePipe,
    TimeAgoPipe,
    VocalesPipe,
    HighlightDirective
  ]
})
export class SharedModule { }
