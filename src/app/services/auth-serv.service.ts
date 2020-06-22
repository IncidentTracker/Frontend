import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})


export class AuthServService {

  Username: string;
  UserEmail: string;

  constructor(private http: HttpClient) { }

  login(email: String, password: String): Observable<any> {
    return this.http.post<any>(`http://18.223.114.221:8000/login/`, { email, password })
      .pipe(
        map(user => {
          if (user) {
            if (user.Data) {
              user.authdata = window.btoa(email + ":" + password);
              localStorage.setItem("currentUser", JSON.parse(JSON.stringify(user.Data.firstname)));
              localStorage.setItem("currentUserEmail", JSON.parse(JSON.stringify(user.Data.email)));
            }
          }
          else {
            return Error;
          }
          return user;
        })
      )
  }
} 