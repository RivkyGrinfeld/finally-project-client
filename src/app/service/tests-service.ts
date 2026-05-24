import { inject, Injectable } from '@angular/core';
import { Tests } from '../model/Tests';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user-service';

@Injectable({
  providedIn: 'root',
})
export class TestsService {
  tests: Array<Tests> = new Array<Tests>();
  BASEURL: String = "http://localhost:7006/api/PointTest"
  http = inject(HttpClient)
  userService = inject(UserService)

  submitTest(answers: any): Observable<any> {
    return this.http.post<any>(`${this.BASEURL}/AddTest?id=${String(this.userService.id())}`, answers);
  }

  getTestByCustomer(custId: string): Observable<Tests> {
    return this.http.get<Tests>(`${this.BASEURL}/GetByCustId?id=${custId}`);
  }
}

