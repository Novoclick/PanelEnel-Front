import { Injectable } from '@angular/core';
import { BrokerService } from './broker.service';
import { registro, responseModal } from '../models/register.model';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(
    private broker: BrokerService 
  ) { }

  getLeads(){
    const url = '/data';
    return this.broker.Get(url);
  }

  getTypeProduct(){
    const url = '/productos';
    return this.broker.Get(url);
  }

  getFildsNoShow(){
    const url = '/GetFildsNoShow';
    return this.broker.Get(url);
  }
}
