import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  user: User;
  recipes: Recipe[];
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  address: string;
  city: string;
  image: string;
  userForm = new FormGroup({
    firstName: new FormControl(this.firstName, [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(20)
    ]),
    lastName: new FormControl(this.lastName, [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(20)
    ]),
    password: new FormControl(this.password, [
      Validators.required,
      Validators.minLength(8)
    ]),
    email: new FormControl(this.email, [
      Validators.required,
      Validators.email,
    ]),
    phone: new FormControl(this.phone, [
      Validators.required,
      Validators.maxLength(9),
      Validators.minLength(8),
      Validators.pattern('^[0-9 ]*')
    ]),
    city: new FormControl(this.city),
    address: new FormControl(this.address),
    image: new FormControl(this.image, Validators.required),
  });

  constructor(private userService: UserService, private recipeService: RecipeService, private route: ActivatedRoute,
              private router: Router) {
                console.log(this.user._id);
               }

  get userFormControl() {
    return this.userForm.controls;
  }

  deleteRecipe(id: string): void {
    console.log('delete');
    this.recipeService.remove(id).subscribe(() => this.recipeService.findAll().subscribe(recipes => this.recipes = recipes));
  }
  onSubmit() {
    console.warn(this.userForm.value);
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      const user = new User(this.userForm.controls.firstName.value,
        this.userForm.controls.lastName.value,
        this.userForm.controls.email.value,
        this.userForm.controls.password.value,
        this.userForm.controls.phone.value,
        this.userForm.controls.address.value,
        this.userForm.controls.city.value,
        this.userForm.controls.image.value);
      this.userService.update(id, user).subscribe(res => {
          // res.headers.keys();
          // this.router.navigate([res.headers.get('location')]);
        });

    });
  }
  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.user = data.user,
        console.log(data);
    });
    this.recipeService.findByUserId(this.user._id).subscribe(recipes => this.recipes = recipes);
    // this.route.paramMap.subscribe(params => {
    //   const id = params.get('id');
    //   if (id) {
    //     this.route.data.subscribe(data => {
    //       this.user = data.user;
    //       this.userForm.patchValue({
    //         firstName: this.user.firstName,
    //         lastName: this.user.lastName,
    //         phone: this.user.phone,
    //         city: this.user.city,
    //         address: this.user.address,
    //         image: this.user.image,
    //         password: this.user.password,
    //       });
    //     });
    // }});
  }
}
