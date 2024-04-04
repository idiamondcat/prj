import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { IAccount, IPublication } from './models';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  login(password: string) {
    const options  = { withCredentials: true };
    return this.http.get(`check_password/${password}`).pipe(
      map(res => res),
      catchError((err) => {
        console.log(err);
        return of(err);
      })
    )
  }

  getAccounts(): Observable<IAccount[]> {
    return this.http.get<IAccount[]>('accounts/', { withCredentials: true }).pipe(
      map((res) =>  res),
      catchError((err) => {
        console.log(err);
        return of(err);
      })
    )
  }

  getPublications(id: number): Observable<IPublication[]> {
    return this.http.get<IPublication[]>(`account/${id}/publications/`).pipe(
      map((res) =>  res),
      catchError((err) => {
        console.log(err);
        return of(err);
      })
    )
  }

  changeDate(id: number, publication: number, date: string): Observable<IAccount> {
    const params = new HttpParams()
    .set('account_id', id)
    .set('publication_id', publication)
    .set('new_datetime', date);
    return this.http.put<IAccount>(`account/${id}`, { params }).pipe(
      map((res) =>  console.log(res)),
      catchError((err) => {
        console.log(err);
        return of(err);
      })
    )
  }
}
