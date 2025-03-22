import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { User } from '../model/user';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from '../model/decodedToken';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _apiurl = 'http://localhost:5000/api';
  private username = new BehaviorSubject<string | null>(null);
  username$ = this.username.asObservable();

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  register(user: User): Observable<User[]> {
    return this.http.post<User[]>(`${this._apiurl}/register`, user);
  }

  login(emailId: string, password: string): Observable<any> {
    return this.http.post<{ token: string; username: string }>(`${this._apiurl}/login`, {
        emailId,
        password,
      })
      .pipe(
        tap((res) => {
          if (res.token) {
            this.cookieService.set('authToken', res.token, { path: '/' });
            this.setUsername(res.token);
          }
        })
      );
  }

  private setUsername(token: string | null) {
    if (!token) {
      this.username.next(null);
      return;
    }

    try {
      const decoded: DecodedToken = jwtDecode(token);
      this.username.next(decoded.username);
    } catch (error) {
      console.error('Invalid Token:', error);
      this.username.next(null);
    }
  }


  getUsername(): Observable<string | null> {
    return this.username$;
  }

  isLoggedIn(): boolean {
    return !!this.cookieService.check('authToken'); //check if token exists
  }

  logout(): void {
    this.cookieService.delete('authToken', '/');
    sessionStorage.clear();
    this.username.next(null);
  }  
}
