import { Component, OnInit } from '@angular/core';
import { Sevice1Service } from 'src/app/service1/sevice1.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'inst-comp-a',
  templateUrl: './comp-a.component.html',
  styleUrls: ['./comp-a.component.scss'],
  providers: [Sevice1Service],
})
export class CompAComponent implements OnInit {
  constructor(private valueService: Sevice1Service) {}

  value$ = new Observable();

  ngOnInit(): void {
    this.value$ = this.valueService.value$;
  }

  addValueCompA() {
    this.valueService.addValue();
  }

  decValueCompA() {
    this.valueService.decValue();
  }
}
