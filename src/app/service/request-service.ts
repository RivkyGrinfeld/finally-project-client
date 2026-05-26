import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { Request } from '../model/Request';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
     requests:Array<Request>  = new Array<Request>();
     BASEURL: String = "https://localhost:7006/api/Request"
    http =inject(HttpClient) 
 
  init ():Observable<Array<Request>>{
      return this.http.get<Array<Request>>(this.BASEURL + "/GetAll")
    }
}
