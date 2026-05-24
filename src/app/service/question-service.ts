import { inject, Injectable } from '@angular/core';
import { Questions } from '../model/Questions';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  
    questions: Array<Questions> = new Array<Questions>();
    BASEURL: String = "http://localhost:7006/api/Questions"
    http = inject(HttpClient)
    init(): Observable<Array<Questions>> {
      return this.http.get<Array<Questions>>(this.BASEURL + "/GetAll")
    }
  
}
