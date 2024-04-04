import { AbstractControl } from '@angular/forms';

export function checkRegexp(control: AbstractControl) {
  if (!control.value.match('(?=.*[A-Z])')) {
    return { errorStr: { message: 'Минимум одна заглавная буква' } };
  }
  if (!control.value.match('(?=.*[a-z])')) {
    return { errorStr: { message: 'Минимум одна строчная буква' } };
  }
  // if (!control.value.match('(?=.*[0-9])')) {
  //   return { errorStr: { message: 'Минимум одно число' } };
  // }
  // if (!control.value.match('(?=.*[!@#$%^&*])')) {
  //   return { errorStr: { message: 'Минимум один спецсимвол' } };
  // }
  // if (!control.value.match('.{8,}')) {
  //   return { errorStr: { message: 'Минимум 8 символов' } };
  // }
  return null;
}