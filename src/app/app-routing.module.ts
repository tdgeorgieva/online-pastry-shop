import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NameEditorComponent } from './name-editor/name-editor.component';
import { AddRecipeComponent} from './add-recipe/add-recipe.component';


const routes: Routes = [
  {path: 'register', component: RegisterComponent },
  {path: 'login', component: LoginComponent},
  {path: 'name-editor', component: NameEditorComponent},
  {path: 'add-recipe', component: AddRecipeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
