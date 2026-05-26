import { inject, Injectable } from '@angular/core';
import { Answers } from '../model/Answers';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnswersService {
  answers: Array<Answers> = new Array<Answers>();
  BASEURL: String = "https://localhost:7006/api/Answers"
  http = inject(HttpClient)
  init(): Observable<Array<Answers>> {
    return this.http.get<Array<Answers>>(this.BASEURL + "/GetAll")
  }
}
