import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _apiurl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  register(user: User): Observable<User[]>{
    return this.http.post<User[]>(this._apiurl, user);
  }

  login(emailId:string,password:string):Observable<any>{
    return this.http.get<User[]>(this._apiurl)
    .pipe(map(users=>{
      const user=users.find((u:any)=>u.emailId===emailId && u.password===password);
      if(user){
        const token='fake-token-'+new Date().getTime();
        sessionStorage.setItem('authToken',token);
        sessionStorage.setItem('userDetails',JSON.stringify(user));
        return true;
      }
      return false;
    }));
  }

  isAuthenticated(): boolean{
    if(typeof window !== 'undefined' && window.localStorage){
      const token = sessionStorage.getItem('authToken');
      return token != null;
    }
    return false;
  }

  getUsername(): User | null{
    const user = sessionStorage.getItem('userDetails');
    if(user){
      return JSON.parse(user);
    }
    return null;
  }
}
