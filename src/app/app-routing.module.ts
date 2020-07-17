import { AddProductComponent } from './add-product/add-product.component';
import { RecipesComponent } from './recipes/recipes.component';
import { MyRecipesComponent } from './my-recipes/my-recipes.component';
import { ProductViewComponent } from './product-view/product-view.component';
import { HeaderComponent } from './header/header.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { MainPageComponent } from './main-page/main-page.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { AccountComponent } from './account/account.component';
import { ShopComponent } from './shop/shop.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { RecipeViewComponent } from './recipe-view/recipe-view.component';
import { RecipeResolverService } from './recipe-resolver.service';
import { UserResolverService } from './user-resolver.service';
import { UsersComponent } from './users/users.component';
import { LogOutComponent } from './log-out/log-out.component';
import { AuthGuardService } from './auth-guard.service';
import { Role } from './user.model';
import { CommentsComponent } from './comments/comments.component';
import { CommentResolverService } from './comment-resolver.service';
import { DeliveryComponent } from './delivery/delivery.component';

const routes: Routes = [
  { path: 'header', component: HeaderComponent },
  { path: 'main-page', component: MainPageComponent },
  { path: 'account', component: AccountComponent },
  { path: 'shop', component: ShopComponent },
  {
    path: 'shopping-cart', component: ShoppingCartComponent,
    canActivate: [AuthGuardService],
    data: {
      rolesAllowed: [Role.Admin, Role.Regular]
    }
  },
  {
    path: 'recipes', component: RecipesComponent,
    canActivate: [AuthGuardService],
    data: {
      rolesAllowed: [Role.Admin, Role.Regular]
    }
  },
  {
    path: 'my-recipes', component: MyRecipesComponent,
    canActivate: [AuthGuardService],
    data: {
      rolesAllowed: [Role.Admin, Role.Regular]
    }
  },
  { path: 'sign-in', component: SignInComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'log-out', component: LogOutComponent },
  {
    path: 'comments', component: CommentsComponent,
    canActivate: [AuthGuardService],
    data: {
      rolesAllowed: [Role.Admin, Role.Regular]
    }
  },
  {
    path: 'delivery', component: DeliveryComponent,
    canActivate: [AuthGuardService],
    data: {
      rolesAllowed: [Role.Admin, Role.Regular]
    }
  },
  { path: 'product-view', component: ProductViewComponent },
  {
    path: 'users', component: UsersComponent, canActivate: [AuthGuardService],
    data: {
      rolesAllowed: [Role.Admin]
    }
  },
  {
    path: 'add-product', component: AddProductComponent, canActivate: [AuthGuardService],
    data: {
      rolesAllowed: [Role.Admin]
    }
  },
  {
    path: 'comment/add', component: CommentsComponent,
    canActivate: [AuthGuardService],
    data: {
      rolesAllowed: [Role.Admin, Role.Regular]
    }
  },
  {
    path: 'order/add', component: ShoppingCartComponent,
    canActivate: [AuthGuardService],
    data: {
      rolesAllowed: [Role.Admin, Role.Regular]
    }
  },
  {
    path: 'comment/edit/:id', component: CommentsComponent, resolve: { recipe: CommentResolverService },
    canActivate: [AuthGuardService],
    data: {
      rolesAllowed: [Role.Admin, Role.Regular]
    }
  },
  { path: 'recipe/:id', component: RecipeViewComponent, resolve: { recipe: RecipeResolverService } },
  { path: 'account/:id', component: AccountComponent, resolve: { user: UserResolverService } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
