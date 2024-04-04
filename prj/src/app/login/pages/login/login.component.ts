import { Component, DestroyRef, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { checkRegexp } from '../../../regexp.validator';
import { LoginService } from '../../login.service';
import { AccountService } from '../../../account.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-login',
  // standalone: true,
  // imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  hide: boolean = true;
  destroyRef = inject(DestroyRef);
  loginForm = this.builder.group({
    password: ['', [Validators.required, checkRegexp]]
  })

  constructor(private builder: FormBuilder, private router: Router, private accountService: AccountService, private loginService: LoginService) {}

  get password() {
    return this.loginForm.get('password');
  }

  login() {
    const password = this.loginForm.getRawValue().password;
    if (password) {
      this.accountService.login(password).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: (response) => {
          this.loginService.isLogin.set(true);
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.log(err);
          this.loginService.isLogin.set(false);
          this.router.navigate(['/login']);
        }
      })
    }
  }
}
