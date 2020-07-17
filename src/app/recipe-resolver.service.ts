import { RecipeService } from './recipe.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RecipeResolverService implements Resolve<any>{

  constructor(private recipeService: RecipeService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = route.paramMap.get('id');
    return this.recipeService.findById(id);


  }
}
