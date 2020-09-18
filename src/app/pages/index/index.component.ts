import { Component, OnInit } from '@angular/core';
import { DbService } from '../../services/db.service';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from '../../modal/form/form.component';
import { ExcelService } from '../../services/excel.service';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  
  dataSource: Array<any>;
  displayedColumns: string[] = ['fechaEntrega', 'fechaGestion', 'empresa', 'tipoDocumento', 'nit', 'observaciones'];
  nombreCampos: Array<any> = [];
  valorCampos: Array<any> = [];
  products: Array<any> = [];
  doughnutChartLabels: Label[] = [];
  doughnutChartData: MultiDataSet = [];
  options = { 

    //responsive: false,
    //maintainAspectRatio: false,
  }
  colors : Color[] = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'yellow', 'purple', 'grey'],
    },
  ];
  doughnutChartType: ChartType = 'doughnut';
  
  
  
  constructor( private db: DbService, public dialog: MatDialog, private excelService: ExcelService ) { }
  
  ngOnInit(): void {
    this.db.getLeads().subscribe((x: any) => {
      this.dataSource = x.q;
      for (let clave in this.dataSource[0]) {
        if (this.dataSource[0].hasOwnProperty(clave)) {
          this.nombreCampos.push(clave);
          this.valorCampos.push(this.dataSource[0][clave]);
        }
      }
    })
    this.db.getTypeProduct().subscribe( (r: any) =>{
      this.products = r.q;
      r.q.forEach(element => {
        if( element.producto !== null && element.producto !== ''){
          this.doughnutChartLabels.push(element.producto);
          this.doughnutChartData.push(element.count);
        }
      });
    })
    
  }
  
  select(data: any) {
    this.dialog.open(FormComponent, {
      data: {
        data,
        nombreCampos: this.nombreCampos,
        valorCampos: this.valorCampos
      },
      height: '100%',
      width: '100%',
    });
  }
  
  generateExcel() {
    this.excelService.generateExcel( this.dataSource, this.nombreCampos );
  }
  
}
