import { RecipeService } from './../recipe.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { FormControl, Validators, FormGroup, ValidationErrors, AbstractControl } from '@angular/forms';
import { Recipe } from '../recipe.model';
import { User, Role } from '../user.model';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-my-recipes',
  templateUrl: './my-recipes.component.html',
  styleUrls: ['./my-recipes.component.scss']
})
export class MyRecipesComponent implements OnInit {

  recipes: Recipe[];
  adminRole: Role = Role.Admin;
  user: User;
  constructor(private userService: UserService, private recipeService: RecipeService, private authService: AuthService,
              private route: ActivatedRoute) { }

  get AuthService() {
    return this.authService;
  }
  deleteRecipe(id: string): void {
    console.log('delete');
    this.recipeService.remove(id).subscribe(() => this.recipeService.findAll().subscribe(recipes => this.recipes = recipes));
  }

  ngOnInit(): void { }

}
