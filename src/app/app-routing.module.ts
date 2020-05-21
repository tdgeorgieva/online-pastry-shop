import { HeaderComponent } from './header/header.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { MainPageComponent } from './main-page/main-page.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { AccountComponent } from './account/account.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeResolverService } from './recipe-resolver.service';
import { ShopComponent } from './shop/shop.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';


const routes: Routes = [
  { path: 'header', component: HeaderComponent },
  { path: 'main-page', component: MainPageComponent },
  { path: 'account', component: AccountComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'recipes', component: RecipesComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'recipe/:id', component: RecipesComponent, resolve: { recipe: RecipeResolverService } },
  { path: 'edit/:id', component: RecipesComponent, resolve: { recipe: RecipeResolverService } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
