import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { checkRegexp } from 'src/app/regexp.validator';
import { LoginService } from '../../login.service';

@Component({
  selector: 'app-login',
  // standalone: true,
  // imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  hide: boolean = true;
  loginForm = this.builder.group({
    password: ['', [Validators.required, checkRegexp]]
  })

  constructor(private builder: FormBuilder, private router: Router, private loginService: LoginService) {}

  get password() {
    return this.loginForm.get('password');
  }

  login() {
    const token = 'GfhfkYGhjfh46y4jvdfkjgkjHHNJ44fks9dkkDGN';
    localStorage.setItem('token', token);
    this.loginService.isLogin.next(true);
    this.router.navigate(['/']);
  }
}
