import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../service/user.service";
import Swal from 'sweetalert2'
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  submittedSignUpForm = false;
  signUpForm: FormGroup;
  email: any;
  password: any;
  consulter: any;
  rePassword: any;
  name: any;
  address: any;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private userService: UserService) {
  }

  ngOnInit() {
    this.reactiveSignInForm();
  }

  reactiveSignInForm() {
    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      password: ['', Validators.required],
      rePassword: ['', Validators.required],
      consulter: ['', Validators.required],
      address: ['', Validators.required]
    }, {
      validator: this.MustMatch('password', 'rePassword')
    });
  }

  get f() {
    return this.signUpForm.controls;
  }


  onSubmitSignUp() {
    this.submittedSignUpForm = true;
    if (this.signUpForm.invalid) {
      return;
    }

    sessionStorage.setItem('$email', this.email);
    sessionStorage.setItem('$consulter', this.consulter);
    sessionStorage.setItem('$name', this.name);
    sessionStorage.setItem('$password', this.password);
    sessionStorage.setItem('$address_address', this.address);

    this.router.navigate(['/dashboard/gender']);

  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({mustMatch: true});
      } else {
        matchingControl.setErrors(null);
      }
    };
  }


  checkEmail(email: any) {
    this.userService.isExistEmail(email).subscribe(isExist => {
      if (isExist) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'That email is taken. Try another!',
          showConfirmButton: false,
          timer: 2000
        })
        this.email = undefined;
        return false;
      }
    });
  }
}
