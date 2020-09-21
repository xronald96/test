import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transactions } from '../model/transactions';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

   
  constructor(public http: HttpClient) { }
  getTransactions(nameFilter?: string, value?:string):Observable<Transactions[]>{
    const params = new HttpParams().append(nameFilter, value);
    return this.http.get<Transactions[]>("https://us-central1-code-challenge-e9f47.cloudfunctions.net/app/transactions",{params});
  }

}
