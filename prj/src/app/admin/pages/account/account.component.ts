import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../../../account.service';
import { ModalComponent } from '../../components/modal/modal.component';
import { IPublication } from '../../../models';

@Component({
  selector: 'app-account',
  // standalone: true,
  // imports: [],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent implements OnInit {
  public id: number;
  public publications: IPublication[];
  destroyRef = inject(DestroyRef);

  constructor(private route: ActivatedRoute, public dialog: MatDialog, private accountService: AccountService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => (this.id = Number(params['id'])));
    this.accountService.getPublications(this.id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(res => {
      this.publications = res;
    })
  }

  public openModal(publication: IPublication) {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '600px',
      data: publication,
    });
  }
}
