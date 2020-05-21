import { Injectable } from '@angular/core';
import { Recipe, IdType } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor() {
    console.log('calling recipeservice ctr');
    const data = JSON.parse(localStorage.getItem('recipes'));
    if (data !== null) {
      this.recipes = data;
      console.log('service posts', this.recipes);
      RecipeService.nextId = this.recipes.length;
    }
   }

  static nextId = 0;
  private recipes = [];

  findAll() {
    return this.recipes;
  }
  findById(id: IdType): Recipe | undefined {
    return this.recipes.find(e => e.id === id);
  }
  create(recipe: Recipe) {
    console.log(RecipeService.nextId);
    recipe.id = ++RecipeService.nextId;
    console.log(RecipeService.nextId);
    this.recipes.push(recipe);
    localStorage.setItem('accounts', JSON.stringify(this.recipes));
  }
  update(recipe: Recipe): Recipe {
    const index = this.recipes.findIndex(p => p.id === recipe.id);
    if (index >= 0) {
      this.recipes[index] = recipe;
      localStorage.setItem('recipes', JSON.stringify(this.recipes));
      return recipe;
    } else {
      throw new Error(`Recipe with ID=${recipe.id} not found.`);
    }
  }
  remove(id: IdType) {
    this.recipes.splice(this.recipes.findIndex(item => item === id), 1);
    localStorage.setItem('recipes', JSON.stringify(this.recipes));
  }
}
