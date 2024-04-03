import { Component, DestroyRef, Inject, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IPublication } from '../../../models';
import { AccountService } from '../../../account.service';
import * as moment from 'moment';
import 'moment/locale/ru';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-modal',
  // standalone: true,
  // imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'ru-RU'}, provideMomentDateAdapter()]
})
export class ModalComponent {
  date: string;
  time: string;
  dateForm = new FormGroup({
    date: new FormControl(moment()),
    time: new FormControl('')
  })
  destroyRef = inject(DestroyRef);
  constructor(@Inject(MAT_DIALOG_DATA) public data: IPublication,
  @Inject(MAT_DATE_LOCALE) private _locale: string,
  private builder: FormBuilder,
  private accountService: AccountService) {
    const fullDate: string[] = data.datetime.split('T');
    this.date = fullDate[0];
    this.time = fullDate[1];
    this.createForm();
  }

  get getDate(): AbstractControl<moment.Moment | null, moment.Moment | null> | null {
    return this.dateForm.get('date');
  }

  get getTime(): AbstractControl<string | null, string | null> | null {
    return this.dateForm.get('time');
  }

  private createForm() {
    this.dateForm = this.builder.group({
      date: [moment(this.date), [Validators.required]],
      time: [this.time, [Validators.required]],
    });
  }

  public changeDateTime() {
    const newDate = this.getDate?.value ?? moment();
    const newTime = this.getTime?.value;
    const changedDate = newDate.utc(true).toDate().toISOString().split('T')[0].split(':');
    const newData = new Date(changedDate + ' ' + newTime).toISOString();
    this.accountService.changeDate(this.data.account_id, this.data.publication_id, newData).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(res => {
      console.log(res);
    });
  }
}
