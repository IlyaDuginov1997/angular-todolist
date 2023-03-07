// import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
//
// @Injectable({
//   providedIn: 'root',
// })
export class Sevice1Service {
  constructor() {}

  value$: BehaviorSubject<number> = new BehaviorSubject<number>(11);

  addValue() {
    this.value$.next(this.value$.getValue() + 1);
  }

  decValue() {
    this.value$.next(this.value$.getValue() - 1);
  }
}
