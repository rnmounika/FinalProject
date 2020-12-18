import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
// import { Account } from '../_models';
import { Router } from '@angular/router';
// import { BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class DataService {
  todoURL = 'http://localhost:3001/api/budget';
  // private loggedIn = new BehaviorSubject<boolean>(false);
  isloggedIn= false;

  constructor( private router: Router,private http: HttpClient)
  {

  }
  getisLoggedIn() {
    return this.isloggedIn; // {2}
  }
  setLoggedIn(){
    this.isloggedIn=true
  }
  public getBudgetData(email:string): Observable<any[]>
  {
    console.log(email)
    const token = localStorage.getItem('jwt111');
    if(token ==null)
    {
      console.log("T"+token);
      this.isloggedIn=false;
      this.router.navigate(['/login']);
    }
    else{
      this.isloggedIn=true
      return this.http.post<any[]>(this.todoURL,{email},{headers: {
        'Authorization': `Bearer ${token}`}});
    }
    // console.log(this.http.get<any[]>(this.todoURL));
    //   return this.http.post<any[]>(this.todoURL,{headers: {
    //     'Authorization': `Bearer ${token}`
    // }});


  }

  public getRefreshToken(email:string ,refreshToken:string)
  {
    return this.http.post<any>(`http://localhost:3001/api/token`, { email, refreshToken });
  }
  public deleteBudgetData(email:string ,title:string)
  {
    return this.http.post<any>(`http://localhost:3001/api/deleteBudget`, { email, title });
  }

  public addBudgetData(email:string ,title:string,value:number,expectedBudget:number, color:string)
  {
    return this.http.post<any>(`http://localhost:3001/api/addBudget`, { email, title ,value,expectedBudget,color});
  }

  public updateBudgetData(email:string ,title:string,value:number,expectedBudget:number)
  {
    return this.http.post<any>(`http://localhost:3001/api/updateBudget`, { email, title ,value,expectedBudget});
  }

  // public getBudgetData(): Observable<any[]>
  // {
  //   const token = localStorage.getItem('jwt111');
  //   // console.log(this.http.get<any[]>(this.todoURL));
  //     return this.http.get<any[]>(this.todoURL,{headers: {
  //       'Authorization': `Bearer ${token}`
  //   }});

  // }

  public login(username: string, password: string) {
    return this.http.post<any>(`http://localhost:3001/api/login`, { username, password });
        // .pipe( map(user => {
        //     // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
        //     // user.authdata = window.btoa(username + ':' + password);
        //     // localStorage.setItem('user', JSON.stringify(user));
        //     // this.userSubject.next(user);
        //     // return user;
        // }));
}

public register(account: Account) {
  console.log(account)
  return this.http.post<any>(`http://localhost:3001/api/register`,account);
      // .pipe( map(user => {
      //     // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
      //     // user.authdata = window.btoa(username + ':' + password);
      //     // localStorage.setItem('user', JSON.stringify(user));
      //     // this.userSubject.next(user);
      //     // return user;
      // }));
}

public logout() {
  // remove user from local storage and set current user to null
  localStorage.removeItem('jwt111');
  this.isloggedIn=false;
  // this.userSubject.next(null);
  this.router.navigate(['/login']);
}

// validate( token:string ): Observable< boolean >{
//         return new Observable.interval(500).flatMap( () => {
//             this.jwtH.isTokenExpired( token )
//         } );
//     }

}
