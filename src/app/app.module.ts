import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatMenuModule, } from '@angular/material/menu';
import { MatSliderModule } from '@angular/material/slider';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { HeaderComponent } from './header/header.component';
import { MatCardModule } from '@angular/material/card';
import { MainPageComponent } from './main-page/main-page.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { AccountComponent } from './account/account.component';
import {MatIconModule} from '@angular/material/icon';
import { ShopComponent } from './shop/shop.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatChipsModule} from '@angular/material/chips';

import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { StarComponentComponent } from './star-component/star-component.component';
import { ProductViewComponent } from './product-view/product-view.component';
import { RecipesComponent } from './recipes/recipes.component';
import { MyRecipesComponent } from './my-recipes/my-recipes.component';
import { NewRecipeComponent } from './new-recipe/new-recipe.component';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { HttpClientModule } from '@angular/common/http';
import { AddProductComponent } from './add-product/add-product.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { RecipeViewComponent } from './recipe-view/recipe-view.component';
import { UsersComponent } from './users/users.component';
import { LogOutComponent } from './log-out/log-out.component';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthGuardService } from './auth-guard.service';
import { CommentsComponent } from './comments/comments.component';
import { RatingModule } from 'ngx-bootstrap/rating';
import { DeliveryComponent } from './delivery/delivery.component';
export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HeaderComponent,
    MainPageComponent,
    SignInComponent,
    AccountComponent,
    ShopComponent,
    ShoppingCartComponent,
    StarComponentComponent,
    ProductViewComponent,
    RecipesComponent,
    MyRecipesComponent,
    NewRecipeComponent,
    IngredientsComponent,
    AddProductComponent,
    RecipeViewComponent,
    UsersComponent,
    LogOutComponent,
    CommentsComponent,
    DeliveryComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatGridListModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatMenuModule,
    MatSliderModule,
    MatPaginatorModule,
    MatAutocompleteModule,
    MatSelectModule,
    FormsModule,
    MatDividerModule,
    MatCardModule,
    ScrollingModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule,
    MatChipsModule,
    HttpClientModule,
    NgbModule,
    DragDropModule,
    RatingModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:3000'],
        disallowedRoutes: [],
      },
    }),
  ],
  providers: [AuthGuardService],
  bootstrap: [AppComponent],
  entryComponents: [ProductViewComponent]
})
export class AppModule {

}
