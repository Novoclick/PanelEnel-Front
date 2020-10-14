import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  autenticado: boolean = false;

  constructor() { }

  estaAutenticado(){
    return this.autenticado;
  }

  autenticacionCorrecta(){
    this.autenticado = true;
  }

  cerrarSesion(){
    this.autenticado = false;
  }


}
