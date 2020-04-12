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
  constructor() { }
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.registerForm.value);
  }

  ngOnInit(): void {
      this.registerForm = new FormGroup({
        'firstName': new FormControl(this.firstName, [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20)
        ]),
        'lastName': new FormControl(this.lastName, [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20)
        ]),
        'password': new FormControl(this.password, [
          Validators.required,
          Validators.minLength(8),
        ]),
        'email': new FormControl(this.email, [
          Validators.required,
          Validators.email
        ]),
        'confirmPassword': new FormControl(this.confirmPassword, [
          RegisterComponent.matchValues('password'),
        ])

      })

      this.registerForm.controls.password.valueChanges.subscribe(() => {
        this.registerForm.controls.confirmPassword.updateValueAndValidity();
      });
    }

}
