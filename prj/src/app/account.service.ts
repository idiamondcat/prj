import { HttpClient, HttpErrorResponse, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { IAccount, IPublication } from './models';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  login(password: string) {
    return this.http.get(`check_password/${password}`).pipe(
      map(res => res),
      catchError((err: HttpErrorResponse) => {
        console.error(err.message, err.status, err.statusText);
        if(err.status !== 0) {
          return of(err);
        } else {
          return throwError(() => err);
        }
      })
    )
  }

  getAccounts(): Observable<string[]> {
    return this.http.get<string[]>('accounts/').pipe(
      map((res) =>  res),
      catchError((err: HttpErrorResponse) => {
        return throwError(() => err);
      })
    )
  }

  getPublications(id: string): Observable<IPublication[]> {
    return this.http.get<IPublication[]>(`account/${id}/publications/`).pipe(
      map((res) =>  res),
      catchError((err) => {
        return throwError(() => err);
      })
    )
  }

  changeDate(id: string, publication: string, date: string): Observable<IAccount> {
    const params = new HttpParams()
    .set('account_id', id)
    .set('publication_id', publication)
    .set('new_datetime', date);
    return this.http.put<IAccount>(`account/${id}`, { params }).pipe(
      map((res) =>  res),
      catchError((err) => {
        return throwError(() => err);
      })
    )
  }
}
