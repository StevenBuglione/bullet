import { UserRegistration } from './../models/userRegistration';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  //user: User;
  registerForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-red',
    };
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group(
      {
        gender: ['male'],
        username: ['', Validators.required],
        knownAs: ['', Validators.required],
        dateOfBirth: [null, Validators.required],
        city: ['', Validators.required],
        country: ['', Validators.required],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(8),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value
      ? null
      : { mismatch: true };
  }

  register() {}

  cancel() {}
}
