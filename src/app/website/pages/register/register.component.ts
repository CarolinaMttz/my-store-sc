import { Component, OnInit } from '@angular/core';
import { onExit } from './../../../guards/exit.guard';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements onExit {

  onExit(){ //esta es una lógica de guardian desde el componente
    const rta = confirm('Lógica de componente: ¿Está seguro que desea salir?');
    return rta;
  }

}
