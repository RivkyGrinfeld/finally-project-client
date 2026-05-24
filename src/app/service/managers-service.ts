import { inject, Injectable } from '@angular/core';
import { Manager } from '../model/Manager';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { log } from 'echarts/types/src/util/log.js';

@Injectable({
  providedIn: 'root',
})
export class ManagersService {
  managers: Array<Manager> = new Array<Manager>();
  BASEURL: String = "http://localhost:7006/api/Manager/"
  http = inject(HttpClient)
  // ngOnInit() {
  //   this.http.get<Array<Manager>>(this.BASEURL + "/GetAll").subscribe(res => this.managers = res)
  // }
  init(): Observable<Manager[]> {
    return this.http.get<Manager[]>(this.BASEURL + "GetAll");
  }
  getManager(): Observable<Manager[]> {
    return this.http.get<Manager[]>(this.BASEURL + "GetAll");
  }

//  async findCompanyByUserId(id: number) {
//     if (!this.companies || this.companies.length === 0) {
//       this.companies = await firstValueFrom(this.getCompanies());
//     }
//     return this.companies.find(x => x.userId == id)?.id;
//   }


  async findManagerdByUserId(id: number) {
    if (!this.managers || this.managers.length === 0) {
      this.managers = await firstValueFrom(this.getManager());
    } 
    console.log(this.managers);
    
       console.log(this.managers.find(x => x.userId == id)?.id);

    return this.managers.find(x => x.userId == id)?.id
    
 
  }

  InitC() {
    this.init().subscribe(res => this.managers = res)
    // console.log(this.managers)
  }
  getManagerdName(id: string): string {
    const manager = this.managers.find(m => m.id === id);
    console.log(manager+";;;;");
    return manager? manager.firstName : "not found";
  }


}




// import { inject, Injectable } from '@angular/core';
// import { Companies } from '../model/Companies';
// import { HttpClient } from '@angular/common/http';
// import { first, firstValueFrom, Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class CompaniesService {
//   companies: Array<Companies> = new Array<Companies>();
//   BASEURL: String = "http://localhost:7006/api/Companies/"

//   http = inject(HttpClient)

//   getCompanies(): Observable<Companies[]> {
//     return this.http.get<Companies[]>(this.BASEURL + "GetAll");
//   }

//   addCompany(company: Companies): Observable<Companies> {
//     company.id = 0;
//     return this.http.post<Companies>(this.BASEURL + "AddCompany", company);
//   }
//   async findCompanyByUserId(id: number) {
//     if (!this.companies || this.companies.length === 0) {
//       this.companies = await firstValueFrom(this.getCompanies());
//     }
//     return this.companies.find(x => x.userId == id)?.id;
//   }

//   InitC() {
//     this.Init().subscribe(res => this.companies = res)
//     console.log(this.companies)
//   }
//   Init(): Observable<Array<Companies>> {

//     return this.http.get<Array<Companies>>(this.BASEURL + "GetAll")
//   }
//   getCompanyName(id: string): string {
//     const company = this.companies.find(c => c.id.toString() === id);
//     return company ? company.name : 'חברה לא נמצאה';
//   }
// }

