import { AuthService } from './../auth.service';
import { RecipeService } from './../recipe.service';
import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { Role } from '../user.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {

  recipes: Recipe[];
  adminRole: Role = Role.Admin;
  constructor(private recipeService: RecipeService, private authService: AuthService) { }
  get AuthService() {
    return this.authService;
  }
  deleteRecipe(id: string): void {
    console.log('delete');
    this.recipeService.remove(id).subscribe(() => this.recipeService.findAll().subscribe(recipes => this.recipes = recipes));
  }
  ngOnInit(): void {
    this.recipeService.findAll().subscribe(recipes => this.recipes = recipes);
  }

}
