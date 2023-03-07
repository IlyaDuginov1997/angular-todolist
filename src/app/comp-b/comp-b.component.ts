import { Component, OnInit } from '@angular/core';
import { Sevice1Service } from 'src/app/service1/sevice1.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'inst-comp-b',
  templateUrl: './comp-b.component.html',
  styleUrls: ['./comp-b.component.scss'],
  providers: [Sevice1Service],
})
export class CompBComponent implements OnInit {
  constructor(private valueService: Sevice1Service) {}

  value$ = new Observable();

  ngOnInit(): void {
    this.value$ = this.valueService.value$;
  }

  addValueCompB() {
    this.valueService.addValue();
  }

  decValueCompB() {
    this.valueService.decValue();
  }
}
