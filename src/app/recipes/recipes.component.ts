import { Component, OnInit } from '@angular/core';
import { Recipe, IdType } from './../recipe.model';
import { RecipeService } from './../recipe.service';
import { FormControl, Validators, FormGroup, ValidationErrors, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {


  show = false;
  showMenu = false;
  counter = 0;
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

  allRecipes: string[] = this.recipeService.findAll();
  recipeForm = new FormGroup({
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

  deleteRecipe(id: IdType): void {
    this.recipeService.remove(id);
  }

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

  constructor(private recipeService: RecipeService) { }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.recipeForm.value);
  }




  ngOnInit(): void {

    
  }


}