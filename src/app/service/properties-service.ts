import { inject, Injectable } from '@angular/core';
import { Properties } from '../model/Properties';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {
    properties:Array< Properties>  = new Array<Properties>();
    BASEURL: String = "https://localhost:7006/api/Properties"

  http =inject(HttpClient) 
  async ngOnInit(){
this.properties =await firstValueFrom(this.Init());
}
  
 InitP(){
    this.Init().subscribe( res => this.properties = res)
    
  }
  Init(): Observable<Array<Properties>> {
    return this.http.get<Array<Properties>>(this.BASEURL + "/GetAll");
  }
  addProperty(propertyData: Properties) {
    // כאן תוכל להוסיף את הלוגיקה להוספת ענף חדש, למשל פתיחת מודאל או ניווט לעמוד אחר
    this.http.post(this.BASEURL + "/AddProperty", propertyData).subscribe(res => {
      alert("addProperty")
    });

  }


}
