import { User } from './../user.model';
import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, ValidationErrors, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})



export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  address: string;
  city: string;
  image: string;
  isSubmitted = false;
  isSuccessful = false;
  errorMsg = '';

  get registerFormControl() {
    return this.registerForm.controls;
  }

  public static matchValues(
    matchTo: string // name of the control to match to
  ): (AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      return !!control.parent &&
        !!control.parent.value &&
        control.value === control.parent.controls[matchTo].value
        ? null
        : { notSame: true };
    };
  }
  constructor(private userService: UserService) { }
  onSubmit() {
    // TODO: Use EventEmitter with form value
    this.isSubmitted = true;
    console.warn(this.registerForm.value);
    let user = new User(this.registerForm.controls.firstName.value,
      this.registerForm.controls.lastName.value,
      this.registerForm.controls.password.value,
      this.registerForm.controls.email.value,
      this.registerForm.controls.phone.value,
      this.registerForm.controls.city.value,
      this.registerForm.controls.address.value,
      this.registerForm.controls.image.value);
      
    this.userService.create(user).subscribe(res => {
      this.isSuccessful = true;
      // res.headers.keys();
      // this.router.navigate([res.headers.get('location')]);
    }, err => {
      this.isSuccessful = false;
      this.errorMsg = err;
    });
  }

  ngOnInit(): void {

    this.registerForm = new FormGroup({
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
      confirmPassword: new FormControl(this.confirmPassword, [
        RegisterComponent.matchValues('password'),
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
    this.registerForm.controls.password.valueChanges.subscribe(() => {
      this.registerForm.controls.confirmPassword.updateValueAndValidity();
    });
  }

}
