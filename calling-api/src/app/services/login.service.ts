import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  
  constructor(public http: HttpClient) { }

  login(credentials){
    return this.http.post("https://us-central1-code-challenge-e9f47.cloudfunctions.net/app/token", credentials);
  }

}
