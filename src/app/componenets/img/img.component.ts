import { Component, OnInit, Input, Output, EventEmitter, OnChanges, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  @Input() img: string = '';
  @Output() loaded = new EventEmitter<String>();
  imageDefault = './assets/images/default.png';

  constructor(){
    /*
    *Before render: corre antes del render
    *En el constructor no debemos correr cosas ASINCRONAS
    *Se deben hacer cosas que suceden de inmediato. Ej: this.image = 'nuevo valor';
    *La instancia del componente solo se crea una vez
    */
    console.log('constructor', 'imgValue => ', this.img);
  }

  ngOnChanges(){
    /*
    *Corre antes y durante del render
    *Su objetivo es actualizar los cambios en los inputs, corre muchas veces:
    las veces que nosotros actualicemos los inputs de nuestros componentes
    */
    console.log('ngOnChange', 'imgValue => ', this.img);
  }

  ngOnInit(): void{
    /*
     *Tambien corre antes de renderizarse
     *Aquí si podemos correr cosas asíncronas: un fetch, llamadas a API´s, promesas,
     cualquier cosa en la que necesitemos espera un tiempo
     *Corre una sola vez
     */
     console.log('ngOnInit', 'imgValue => ', this.img);
  }

  ngAfterViewInit() {
    /*
      *Corre después de que todo esté renderizado
      *Aqui se manejan los hijos, es decir, manipular esos hijos, ejecutar algunos
      eventos con ellos de forma programatica
    */
    console.log('ngAfterViewInit');
  }

  ngOnDestroy(){
      /**
       * Este se corre solo cuando se va a eliminar el componente       *
       */
      console.log('ngOnDestroy');
  }

  imgError(){
    this.img = this.imageDefault;
  }

  imgLoaded(){
    console.log('Log hijo');
    this.loaded.emit(this.img);
  }


}
