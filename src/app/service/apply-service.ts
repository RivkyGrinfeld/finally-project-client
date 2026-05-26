import { inject, Injectable } from '@angular/core';
import { Apply } from '../model/Apply';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApplyService {
  applies: Array<Apply> = new Array<Apply>();
  BASEURL: String = "https://localhost:7006/api/Apply"
  http = inject(HttpClient)
  init(): Observable<Array<Apply>> {
    return this.http.get<Array<Apply>>(this.BASEURL + "/GetAll")
  }
  getAppliesByPostId(postId: number | null): Observable<Array<Apply>> {
    return this.http.get<Array<Apply>>(this.BASEURL + "/GetAll");
  }
  // addApply(){

  //   this.http.post(this.BASEURL+"/AddApply",)
  // }
  confirmedApply(p: Apply): Observable<boolean> {
    return this.http.post<boolean>(this.BASEURL + "/Update", p)
  }
  getApplyByPostAndCust(p: number, c: string) {
    return this.applies.find(x => x.custId == c && x.postId == p)
  }
  createApply(apply: Apply): Observable<Apply> {
    apply.id = 0;
    return this.http.post<Apply>(this.BASEURL + "/AddApply", apply);
  }
}
