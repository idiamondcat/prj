import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AccountService } from '../../../account.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login/login.service';

@Component({
  selector: 'app-admin',
  // standalone: true,
  // imports: [],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {
  accounts: string[] = [];
  destroyRef = inject(DestroyRef);
  constructor(private accountService: AccountService, public dialog: MatDialog, private router: Router, private loginService: LoginService) {}
  ngOnInit(): void {
    this.accountService.getAccounts()
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: (response) => {
        console.log(response);
        this.accounts = response;
      },
      error: (err) => {
        console.log('Error:' + err);
        this.loginService.isLogin.set(false);
        this.router.navigate(['/login']);
      }
    })
  }
}
