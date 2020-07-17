import { RecipeService } from './../recipe.service';
import { Component, OnInit, Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Router } from '@angular/router';
import {NgbTimeStruct, NgbTimeAdapter} from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../auth.service';

const pad = (i: number): string => i < 10 ? `0${i}` : `${i}`;

@Injectable()
export class NgbTimeStringAdapter extends NgbTimeAdapter<string> {

  fromModel(value: string| null): NgbTimeStruct | null {
    if (!value) {
      return null;
    }
    const split = value.split(':');
    return {
      hour: parseInt(split[0], 10),
      minute: parseInt(split[1], 10),
      second: parseInt(split[2], 10)
    };
  }

  toModel(time: NgbTimeStruct | null): string | null {
    return time != null ? `${pad(time.hour)}:${pad(time.minute)}:${pad(time.second)}` : null;
  }
}


@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.scss'],
  providers: [{provide: NgbTimeAdapter, useClass: NgbTimeStringAdapter}]
})

export class NewRecipeComponent implements OnInit {
  prepTime: string;
  cookTime: '13:30:00';
  recipe: Recipe;
  id: string;
  recipeName: string;
  description: string;
  directions: string;
  ingredients: string;
  numberServings: number;
  imageUrl: string;
  difficulty = 0; 
  options: number[] = [1, 2, 3, 4, 5];
  recipeForm = new FormGroup({
    recipeName: new FormControl(this.recipeName, [
      Validators.required,
      Validators.maxLength(30)
    ]),
    description: new FormControl(this.description, [
      Validators.required,
      Validators.maxLength(300)
    ]),
    directions: new FormControl(this.directions, Validators.required),
    ingredients: new FormControl(this.ingredients, Validators.required),
    difficulty: new FormControl(),
    numberServings: new FormControl(),
    prepTime: new FormControl(),
    cookTime: new FormControl(),
    imageUrl: new FormControl(this.imageUrl),
  });

  get recipeFormControl() {
    return this.recipeForm.controls;
  }
  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router,
              private authService: AuthService) {}

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.recipeForm.value);
    const recipe = new Recipe(this.recipeForm.controls.recipeName.value,
      this.recipeForm.controls.description.value,
      this.recipeForm.controls.directions.value,
      this.recipeForm.controls.ingredients.value,
      this.recipeForm.controls.difficulty.value,
      this.recipeForm.controls.numberServings.value,
      this.recipeForm.controls.prepTime.value,
      this.recipeForm.controls.cookTime.value,
      this.recipeForm.controls.imageUrl.value);
    recipe.user_id = this.authService.currentUserId;
    //recipe.products = this.product servise. cartproducts + delivery adres
    this.recipeService.create(recipe).subscribe(res => {
      // res.headers.keys();
      // this.router.navigate([res.headers.get('location')]);
    });
  }
  ngOnInit(): void {
   }

}
//   console.log(this.recipeFormControl.status.value);

  //   this.route.paramMap.subscribe(params => {
  //     const id = params.get('id');

  //     if (id) {
  //       this.route.data.subscribe(data => {

  //         this.recipe = data.recipe;
  //         this.recipeForm.patchValue({
  //           recipeName: this.recipe.recipeName,
  //           description: this.recipe.description,
  //           directions: this.recipe.directions,
  //           ingredients: this.recipe.ingredients,
  //           difficulty: this.recipe.difficulty,
  //           numberServings: this.recipe.numberServings,
  //           prepTime: this.recipe.prepTime,
  //           cookTime: this.recipe.cookTime,
  //           imageUrl: this.recipe.imageUrl
  //         });
  //         console.log('data' + data);
  //       });
  //   }});