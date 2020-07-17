import { RecipeService } from './../recipe.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { FormControl, Validators, FormGroup, ValidationErrors, AbstractControl } from '@angular/forms';
import { Recipe } from '../recipe.model';
import { User } from '../user.model';
import { UserService } from '../user.service';


@Component({
  selector: 'app-my-recipes',
  templateUrl: './my-recipes.component.html',
  styleUrls: ['./my-recipes.component.scss']
})
export class MyRecipesComponent implements OnInit {

  recipes: Recipe[];
  user: User;
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
   // this.filteredRecipes = this.listFilter ? this.performFilter(this.listFilter) : this.recipes;
  }
  constructor(private userService: UserService, private recipeService: RecipeService) {
    this.filteredRecipes = this.recipes;
    this.listFilter = 'banitsa';
  }
  showImage: boolean = false;
  filteredRecipes: Recipe[];
  _listFilter: string;

 
  toggleImage(): void {
    this.showImage = !this.showImage;
  }
  // performFilter(filterBy: string): Recipe[] {
  //   console.log('filter');
  //   filterBy = filterBy.toLocaleLowerCase();
  //   return this.recipes.filter((recipe: Recipe) =>
  //     recipe.recipeName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  // }
  deleteRecipe(id: string): void {
    console.log('delete');
    this.recipeService.remove(id).subscribe(() => this.recipeService.findAll().subscribe(recipes => this.recipes = recipes));
  }

  ngOnInit(): void {
    this.recipeService.findByUserId(this.user._id).subscribe(recipes => this.recipes = recipes);
  }

}
