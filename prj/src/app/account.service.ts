import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, mergeMap, of } from 'rxjs';
import { IAccount, IPublication } from './models';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  // isLogin(): Observable<boolean> {
  //   return this.http.get('check_password').pipe(
  //     map(res => {
  //       if (document.cookie)
  //         return true;
  //       else
  //         return false;
  //     }),
  //     catchError((err) => {
  //       console.log(err);
  //       return of(err);
  //     })
  //   )
  // }

  getAccounts(): Observable<IAccount[]> {
    return this.http.get<IAccount[]>('accounts/').pipe(
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
