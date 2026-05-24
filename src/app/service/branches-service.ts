import { inject, Injectable } from '@angular/core';
import { Branch } from '../model/Branch';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BranchesService {
  branches: Array<Branch> = new Array<Branch>();
  BASEURL: String = "http://localhost:7006/api/Branches"
  http = inject(HttpClient)

InitB(){
this.Init().subscribe(res => this.branches = res)
}

   Init(): Observable<Array<Branch>> {
    // alert("init")
    return  this.http.get<Array<Branch>>(this.BASEURL + "/GetAll")
  }
  
  addBranch(branchData: Branch) {
    // כאן תוכל להוסיף את הלוגיקה להוספת ענף חדש, למשל פתיחת מודאל או ניווט לעמוד אחר
    this.http.post(this.BASEURL + "/AddBranch", branchData).subscribe(res => {
      alert("addBranch")
    });

  }
}
