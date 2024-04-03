import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AccountService } from '../../../account.service';
import { IAccount } from '../../../models';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-admin',
  // standalone: true,
  // imports: [],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {
  accounts: IAccount[] = [];
  destroyRef = inject(DestroyRef);
  constructor(private accountService: AccountService, public dialog: MatDialog) {}
  ngOnInit(): void {
    this.accountService.getAccounts()
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(res => {
      this.accounts = res;
    })
  }
}
