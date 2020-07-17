import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss']
})
export class IngredientsComponent implements OnInit {

  show: boolean = false;
  showMenu: boolean = false;
  counter: number = 0;
  ingredients = [];
  options: number[] = [1, 2, 3, 4, 5];
  measures: string[] = ['kg', 'mg', 'ml', 'pieces'];
  constructor() { }

  addIngredient(newIngr: string) {
    if (newIngr) {
      this.ingredients.push(newIngr);
      console.log(newIngr);
      this.counter++;
      console.log(this.counter);
    }
  }
  remIngredient(ingr: string) {
    if (ingr) {
      const index: number = this.ingredients.indexOf(ingr);
      this.ingredients.splice(index, 1);
      this.counter--;

    }
  }
  ngOnInit(): void {
  }

}
