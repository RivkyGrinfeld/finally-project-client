import { inject, Injectable } from '@angular/core';
import { Companies } from '../model/Companies';
import { HttpClient } from '@angular/common/http';
import { first, firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {
  companies: Array<Companies> = new Array<Companies>();
  BASEURL: String = "https://localhost:7006/api/Companies/"

  http = inject(HttpClient)

  getCompanies(): Observable<Companies[]> {
    return this.http.get<Companies[]>(this.BASEURL + "GetAll");
  }

  addCompany(company: Companies): Observable<Companies> {
    company.id = 0;
    return this.http.post<Companies>(this.BASEURL + "AddCompany", company);
  }
  async findCompanyByUserId(id: number) {
    if (!this.companies || this.companies.length === 0) {
      this.companies = await firstValueFrom(this.getCompanies());
    }
    return this.companies.find(x => x.userId == id)?.id;
  }

  InitC() {
    this.Init().subscribe(res => this.companies = res)
    console.log(this.companies)
  }
  Init(): Observable<Array<Companies>> {

    return this.http.get<Array<Companies>>(this.BASEURL + "GetAll")
  }
  getCompanyName(id: string): string {
    const company = this.companies.find(c => c.id.toString() === id);
    return company ? company.name : 'חברה לא נמצאה';
  }
  
}

