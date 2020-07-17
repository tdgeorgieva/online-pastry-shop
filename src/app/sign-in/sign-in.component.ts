import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  loginForm: FormGroup;
  email: string;
  password: string;
  isSubmitted = false;
  isSuccessful = false;
  errorMsg = '';
  get loginFormControl() {
    return this.loginForm.controls;
  }
  
  onSubmit() {
    this.isSubmitted = true;
    const user = {email: this.loginForm.controls.email.value,
      password: this.loginForm.controls.password.value};
    this.authService.login(user).subscribe(u => {
      console.log('User registration successfull!');
      this.isSuccessful = true;
      this.router.navigate(['/main-page']);
    },
    err => {
      console.error(err);
      this.isSuccessful = false;
      this.errorMsg = err;
      this.loginForm.reset();
      });
  }
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl (this.email, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(this.password, [
        Validators.required
      ])
    });
  }

}
