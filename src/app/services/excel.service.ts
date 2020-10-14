import { Injectable } from '@angular/core';
import * as fs from 'file-saver';
import * as Excel from "exceljs/dist/exceljs.min.js";
import { DatePipe } from '@angular/common';
import { camposNoMostrar } from '../models/register.model';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {
  
  constructor( private datePipe: DatePipe ) { }

  camposANoMostrar: Array<string> = [];
  header: Array<string> = [];
  
  generateExcel( data, camposNoMostrar: camposNoMostrar[]){
    let headerExcel = [];
    this.header = [];

    for (let clave in data.filteredData[0]) {
      if (data.filteredData[0].hasOwnProperty(clave)) {
        this.header.push(clave);
      }
    }

    this.removeItemFromArr( this.header, 'aprobado' );
    this.removeItemFromArr( this.header, 'agente' );

    camposNoMostrar.forEach(element => {
      this.camposANoMostrar.push(element.campo);
    });
    
    this.header.forEach(element => {
      if( this.camposANoMostrar.includes( element ) ){
        this.removeItemFromArr( this.header, element );
      }
    });

    this.header.forEach(element => {
      let elem = {
        header: element, key: element, width: 10,  outlineLevel: 3
      }
      headerExcel.push(elem)
      
    });
    const title = 'Reporte de Leads';
    let workbook = new Excel.Workbook();
    let worksheet = workbook.addWorksheet('Reporte Leads');
    const titleRow = worksheet.addRow([title]);
    //const subTitleRow = worksheet.addRow(['Date : ' + this.datePipe.transform(new Date(), 'medium')]);
    //worksheet.addRow([]);
    // Add Image
    /*const logo = workbook.addImage({
      base64: logoFile.logoBase64,
      extension: 'png',
    });
    
    worksheet.addImage(logo, 'E1:F3');
    worksheet.mergeCells('A1:D2');*/
    
    
    // Blank Row
    //worksheet.addRow([]);
    
    worksheet.columns = headerExcel;
    //const headerRow = worksheet.addRow(header);

    
    data.filteredData.forEach(d => {
      worksheet.addRow(d)
    });
    
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'Reporte.xlsx');
    });
  }

  removeItemFromArr ( arr, item ) {
    let i = arr.indexOf( item );
    if ( i !== -1 ) {
      arr.splice( i, 1 );
    }
  }
}
