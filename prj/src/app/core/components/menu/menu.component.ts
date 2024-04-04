import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../login/login.service';

@Component({
  selector: 'app-menu',
  // standalone: true,
  // imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  loginService = inject(LoginService);
  constructor(private router: Router) {}

  logout() {
    this.loginService.isLogin.set(false);
    this.router.navigate(['/login']);
  }
}
