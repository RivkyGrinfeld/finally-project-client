import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Position } from '../model/Position';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PositionService {
  BASEURL: String = "http://localhost:7006/api/Position"
  http = inject(HttpClient)
  position: Array<Position> = new Array<Position>();
  help: Array<Position> = new Array<Position>();

    InitP():Observable<Array<Position>>{
   return this.http.get<Array<Position>>(this.BASEURL + "/GetAll");
  }

   Init():Observable<Array<Position>> {
    // alert("init")
   return  this.http.get<Array<Position>>(this.BASEURL + "/GetAll")}
//   return this.http.get<Array<Position>>(this.BASEURL + "/GetAll")
//     .pipe(
//       map(res => res.filter(c => c.branchId == b))
//     );
// }
 loadPositions(): Observable<Position[]> {
    return this.InitP()
  }
  addPosition(PositionData: Position) {
    // כאן תוכל להוסיף את הלוגיקה להוספת ענף חדש, למשל פתיחת מודאל או ניווט לעמוד אחר
    this.http.post(this.BASEURL + "/AddPosition", PositionData).subscribe(res => {
      alert("addPosition")
    });
  }
} 
