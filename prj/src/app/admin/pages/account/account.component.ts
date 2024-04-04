import { Component, DestroyRef, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../../../account.service';
import { ModalComponent } from '../../components/modal/modal.component';
import { IPublication } from '../../../models';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-account',
  // standalone: true,
  // imports: [],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent implements OnInit {
  public id: string;
  public publications: IPublication[];
  destroyRef = inject(DestroyRef);

  constructor(private route: ActivatedRoute, public dialog: MatDialog, private accountService: AccountService, private adminService: AdminService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => (this.id = params['id']));
    this.accountService.getPublications(this.id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(res => {
      this.publications = res;
    })
  }

  // ngOnChanges(): void {
  //   if (this.adminService.isUpdate() === true) {
  //     this.getData();
  //     this.adminService.isUpdate.set(false);
  //   }
  // }

  public openModal(publication: IPublication) {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '600px',
      data: publication,
    });
  }

  private getData() {
    this.accountService.getPublications(this.id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(res => {
      this.publications = res;
    })
  }
}
