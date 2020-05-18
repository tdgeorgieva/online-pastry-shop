import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, ValidationErrors, AbstractControl } from '@angular/forms';





@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss']
})
export class AddRecipeComponent implements OnInit {

  show: boolean = false;
  showMenu: boolean = false;
  counter: number = 0;
  recipeForm: FormGroup;
  title: string;
  description: string;
  ingredientsList: string;
  directions: string;
  prepTime: string;
  cookTime: string;
  numServ: string;
  myControl = new FormControl();
  options: number[] = [1, 2, 3, 4, 5];
  ingredients = [];

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
      // for (let i  = 0; i  < this.ingredients.length; i ++) {
      //   console.log(this.ingredients[i]);
      // }
      // console.log(ingr);
      // console.log(this.counter);
    }
  }


  get recipeFormControl() {
    return this.recipeForm.controls;
  }

  constructor() { }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.recipeForm.value);
  }




ngOnInit(): void {

    this.recipeForm = new FormGroup({
      title: new FormControl(this.title, [
        Validators.required,
        Validators.maxLength(30)
      ]),
      description: new FormControl(this.description, [
        Validators.required,
        Validators.pattern('^[a-zA-Z]*')
      ]),
      ingredientsList: new FormControl(this.ingredients, Validators.required),
      directions: new FormControl(this.directions, Validators.required),
      prepTime: new FormControl(this.prepTime, Validators.required),
      cookTime: new FormControl(this.cookTime, Validators.required)
    });
  }


}
