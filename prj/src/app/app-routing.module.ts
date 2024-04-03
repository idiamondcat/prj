import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShellComponent } from './core/components/shell/shell.component';
import { AccountComponent } from './admin/pages/account/account.component';
import { authGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: 'login',
        loadChildren: () =>
          import('./login/login.module').then((m) => m.LoginModule),
      },
      { path: '', loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
      canActivate: [authGuard] },
      // { path: 'details/:id', component: AccountComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
