import { Injectable } from '@angular/core';
import * as fs from 'file-saver';
import * as Excel from "exceljs/dist/exceljs.min.js";
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {
  
  constructor( private datePipe: DatePipe ) { }
  
  generateExcel( data, header){
    let headerExcel = [];
    header.forEach(element => {
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

    
    data.forEach(d => {
      worksheet.addRow(d)
    });
    
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'Reporte.xlsx');
    });
  }
}
