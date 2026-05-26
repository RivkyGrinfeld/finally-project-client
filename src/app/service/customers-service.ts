import { inject, Injectable } from '@angular/core';
import { Customer } from '../model/Customer';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { log } from 'echarts/types/src/util/log.js';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  customers: Array<Customer> = new Array<Customer>();
  BASEURL: String = "https://localhost:7006/api/Customers"
  http = inject(HttpClient)
  ngOnInit() {
    this.http.get<Array<Customer>>(this.BASEURL + "/GetAll").subscribe(res => this.customers = res)
  }
  init(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.BASEURL + "/GetAll");
  }
  async findCustomerdByUserId(id: number) {
    if (!this.customers || this.customers.length === 0) {
      this.customers = await firstValueFrom(this.init());
    }
    console.log(this.customers.find(x => x.userId == id)?.id);
    return this.customers.find(x => x.userId == id)?.id;
  }

 
  async InitC() {
    this.init().subscribe(res => this.customers = res)
    console.log(this.customers)
  }

  addCustomer(formData: FormData): Observable<any> {
    return this.http.post(this.BASEURL + "/AddCustomer", formData);
  }
  getCustomerdByName(id: string) {
    const manager = this.customers.find(m => m.id.toString() === id);
    return manager?.firstName ?? "not found";
  }
  getCustomerById(id: string): Customer {
    if(!this.customers || this.customers.length === 0) {
      this.init().subscribe(res => this.customers = res)
    }
    const manager = this.customers.find(m => m.id.toString() === id);
    return manager ?? new Customer();
  }
}


