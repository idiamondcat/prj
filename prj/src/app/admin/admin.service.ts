import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  public isUpdate = signal<boolean>(false);
}
