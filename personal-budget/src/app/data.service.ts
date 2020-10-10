import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  todoURL = 'http://localhost:3000/budget';

  constructor(private http: HttpClient)
  {

  }

  public getBudgetData(): Observable<any[]>
  {
      return this.http.get<any[]>(this.todoURL);

  }

}
