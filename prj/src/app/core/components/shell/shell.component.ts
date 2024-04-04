import { Component, inject } from '@angular/core';
import { LoginService } from '../../../login/login.service';

@Component({
  selector: 'app-shell',
  // standalone: true,
  // imports: [],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss'
})
export class ShellComponent {
  loginService = inject(LoginService);
}
