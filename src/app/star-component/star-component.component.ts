import { Component, OnInit, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-star-component',
  templateUrl: './star-component.component.html',
  styleUrls: ['./star-component.component.scss']
})
export class StarComponentComponent implements OnChanges {

  @Input() rating;
  starWidth: number;
  constructor() { }
  ngOnChanges(): void {
    this.starWidth = this.rating * 86 / 5;
  }
  // ngOnInit(): void {
  // }

}
