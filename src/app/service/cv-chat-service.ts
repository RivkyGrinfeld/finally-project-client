import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CvDto } from '../model/CvDto';

@Injectable({
  providedIn: 'root'
})
export class CvChatService {
  private apiUrl = 'http://localhost:7006/api/cv/';

  constructor(private http: HttpClient) {}

  sendCv(cv: any): Observable<HttpResponse<Blob>> {
    return this.http.post(this.apiUrl + "next", cv, {
      observe: 'response',
      responseType: 'blob'
    });
  }

  sendAnswer(cv: CvDto): Observable<HttpResponse<Blob>> {
    return this.http.post(this.apiUrl + "aiq", cv, {
      observe: 'response',
      responseType: 'blob'
    });
  }
}
