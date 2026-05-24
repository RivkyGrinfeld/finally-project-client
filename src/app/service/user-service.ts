import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Users } from '../model/Users';
import { firstValueFrom, Observable } from 'rxjs';
import { Login } from '../model/Login';
import id from '@angular/common/locales/extra/id';
import { ManagersService } from './managers-service';
import { CompaniesService } from './companies-service';
import { CustomersService } from './customers-service';
import { log } from 'echarts/types/src/util/log.js';

// @Injectable({
//   providedIn: 'root',
// })
// export class UserService {

//    status = signal<number>(0);

//   users: Array<Users> = new Array<Users>();
//   BASEURL: String = "http://localhost:7006/api/User/"
//   http = inject(HttpClient)

//    ngOnInit() {
//     this.initTry()
//   }
//   async initTry() {
//     this.users = await firstValueFrom(this.init())
//   }

//   init(): Observable<Array<Users>> {
//     return this.http.get<Array<Users>>(this.BASEURL + "GetAll")
//   }
//   isValid(password: string, name: string): Observable<string> {
//     let x = new Login()
//     x.password = password
//     x.userName = name
//     return this.http.post<string>(this.BASEURL + "CheckAuth", x)
//   }

//   getStatusSignal(id: number) {
//       this.status.set(this.users.find(x => x.id == id)?.statuId ?? 0);

//     return this.status;

// }
// }

@Injectable({
  providedIn: 'root',
})
export class UserService {
  managerService = inject(ManagersService);
  companyService = inject(CompaniesService);
  customerService = inject(CustomersService);
  status = signal<number>(0);
  currentUser = signal<Users | null>(null);
  id = signal<string>("");
  users: Array<Users> = [];
  BASEURL: String = "http://localhost:7006/api/User/";
  http = inject(HttpClient);

  async initTry() {
    this.users = await firstValueFrom(this.init());
  }

  init(): Observable<Array<Users>> {
    return this.http.get<Array<Users>>(this.BASEURL + "GetAll");
  }

  isValid(password: string, name: string): Observable<number> {
    let x = new Login()
    x.password = password
    x.userName = name
    return this.http.post<number>(this.BASEURL + "CheckAuth", x)
  }
  async setStatusById(id: number) {
    if (this.users.length === 0) {
      await this.initTry()
    }
    const user = this.users.find(x => x.id == id);
    this.status.set(user?.statusId ?? 0);
    this.currentUser.set(user ?? null);
    this.setId();
  }
  async setStatusAfterLogin(id: number) {
    if (this.users.length === 0) {
      await this.initTry();
    }
    this.setStatusById(id);

  }
  async setStatus() {
    await this.setStatusById(localStorage.getItem("userId") ? parseInt(localStorage.getItem("userId")!) : 0);
  }

  async setId() {
    const userId = Number(localStorage.getItem('userId')) ?? 0;
    if (this.status() == 1) {
      this.id.set(await this.managerService.findManagerdByUserId(userId)?? "");
    }
    else if (this.status() == 2) {
      this.id.set( String(await this.companyService.findCompanyByUserId(userId))?? "");
    }
    else if (this.status() == 3) {
      this.id.set( await this.customerService.findCustomerdByUserId(userId) ?? "");
    }
  }

  getNameById() :string{
   if(this.status()==1){
    return String(this.managerService.getManagerdName(this.id()))
   }
   else if(this.status() == 2){
    return String(this.companyService.getCompanyName(this.id()))
   }
   else{
    return String( this.customerService.getCustomerdByName(this.id()))
   }
    // return user ? user.name : "";
  }
}
