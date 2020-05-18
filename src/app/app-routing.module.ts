import { HeaderComponent } from './header/header.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { AddRecipeComponent} from './add-recipe/add-recipe.component';
import { MainPageComponent } from './main-page/main-page.component';
import { SignInComponent } from './sign-in/sign-in.component';


const routes: Routes = [
  {path: 'register', component: RegisterComponent },
  {path: 'sign-in', component: SignInComponent},
  {path: 'add-recipe', component: AddRecipeComponent},
  {path: 'header', component: HeaderComponent},
  {path: 'main-page', component: MainPageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
