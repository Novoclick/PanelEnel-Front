import { Component, OnInit } from '@angular/core';
import { DbService } from '../../services/db.service';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from '../../modal/form/form.component';
import { ExcelService } from '../../services/excel.service';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';
import { campanas, registro } from 'src/app/models/register.model';
import { MatTableDataSource } from '@angular/material/table';
import { responseModal, camposNoMostrar } from '../../models/register.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['fechaEntrega', 'fechaGestion', 'empresa', 'tipoDocumento', 'nit', 'observaciones'];
  nombreCampos: Array<string> = [];
  valorCampos: Array<string> = [];
  products: Array<campanas> = [];
  doughnutChartLabels: Label[] = [];
  doughnutChartData: MultiDataSet = [];
  options = { 
    
    //responsive: false,
    //maintainAspectRatio: false,
  }
  colors : Color[] = [
    {
      backgroundColor: [
        'rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 
        'rgba(332,32,222,0.3)', 'rgba(85,33,21,0.3)', 'rgba(123,123,123,0.3)',
        'yellow', 'purple', 'grey',
        'blue', 'olive', 'chocolate',
        'cyan', 'darksalmon', 'goldenrod', 
        'lightblue', 'lime', 'MediumTurquoise'
      ],
    },
  ];
  doughnutChartType: ChartType = 'doughnut';
  verGrafico: boolean = false;
  camposNoMostrar: Array<camposNoMostrar>;
  
  
  
  constructor(
    private db: DbService,
    public dialog: MatDialog,
    private excelService: ExcelService,
    private auth: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService
    ) { }
  
  ngOnInit(): void {
    this.spinner.show();
    this.db.getLeads().subscribe((x: responseModal<registro>) => {
      this.dataSource = new MatTableDataSource( x.q ) ;
    });

    this.db.getTypeProduct().subscribe( (r: responseModal<campanas>) =>{
      this.products = r.q;
      r.q.forEach(element => {
        if( element.nombrecampana !== null && element.nombrecampana !== ''){
          this.doughnutChartLabels.push(element.nombrecampana);
          this.doughnutChartData.push(element.count);
        }
      });
      this.spinner.hide();
    })

    this.db.getFildsNoShow().subscribe( (y: responseModal<camposNoMostrar>) =>{
      if( y.OK ){
        this.camposNoMostrar = y.q;
      }
    })
    
  }
  
  select(data: any) {
    for (let clave in data) {
      if (data.hasOwnProperty(clave)) {
        this.nombreCampos.push(clave);
        this.valorCampos.push(data[clave]);
      }
    }
    this.dialog.open(FormComponent, {
      data: {
        data,
        nombreCampos: this.nombreCampos,
        valorCampos: this.valorCampos,
        camposNoMostrar: this.camposNoMostrar
      },
      height: '100%',
      width: '100%',
    });
  }
  
  generateExcel() {
    this.excelService.generateExcel( this.dataSource, this.camposNoMostrar );
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  cambiarVerGrafico(){
    this.verGrafico = !this.verGrafico;
  }
  
  cerrarSesion(){
    this.auth.cerrarSesion();
    this.router.navigate(['/']);
  }
  
}
