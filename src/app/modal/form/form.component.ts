import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { registro } from 'src/app/models/register.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { data: registro, nombreCampos: Array<any>, valorCampos: Array<any> }) { }

  ngOnInit(): void {
    console.log(this.data);
  }

}
