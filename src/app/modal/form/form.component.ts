import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { registro } from 'src/app/models/register.model';
import { camposNoMostrar } from '../../models/register.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  camposANoMostrar: Array<string> = [];
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: { data: registro, nombreCampos: Array<any>, valorCampos: Array<any>, camposNoMostrar: Array<camposNoMostrar> }) { }
  
  ngOnInit(): void {

    this.removeItemFromArr( this.data.nombreCampos, 'aprobado' );
    this.removeItemFromArr( this.data.nombreCampos, 'agente' );
    
    this.data.camposNoMostrar.forEach(element => {
      this.camposANoMostrar.push(element.campo);
    });
    
    this.data.nombreCampos.forEach(element => {
      if( this.camposANoMostrar.includes( element ) ){
        this.removeItemFromArr( this.data.nombreCampos, element );
      }
    });
  }
  
  removeItemFromArr ( arr, item ) {
    let i = arr.indexOf( item );
    if ( i !== -1 ) {
      arr.splice( i, 1 );
    }
  }
  
}
