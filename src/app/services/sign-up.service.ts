import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class SignUpService {

  UserName: string;

  constructor(private http: HttpClient) { }

  //Add new user details
  public AddData(newData): Observable<any> {
    {
      return this.http.post("http://18.223.114.221:8000/signUp", { newData });
    }
  }

  //Generate OTP for the first time user registration
  public GenerateOTP(emailData): Observable<any> {
    {
      return this.http.post("http://18.223.114.221:8000/signUp/generateOTP", { emailData });
    }
  }

  //Validate the first time user token
  public ValidateOTP(email, resettoken): Observable<any> {
    {
      return this.http.post("http://18.223.114.221:8000/signUp/validateOTP", { email, resettoken });
    }
  }

  //Reset password
  public ResetPassword(emailData): Observable<any> {
    {
      return this.http.post("http://18.223.114.221:8000/signUp/resetPassword", { emailData });
    }
  }

  //Validate the user token and reset a new password
  public ValidateResetOTP(email: string, resettoken: string, password: string): Observable<any> {
    {
      return this.http.post("http://18.223.114.221:8000/signUp/validateResetOTP", { email, resettoken, password });
    }
  }
} 