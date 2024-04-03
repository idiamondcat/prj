import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { ShellComponent } from './components/shell/shell.component';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [ShellComponent, MenuComponent],
  exports: [ShellComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule
  ]
})
export class CoreModule { }
