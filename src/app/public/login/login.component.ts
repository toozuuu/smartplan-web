import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../service/user.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  submittedLoginForm = false;
  signInForm: FormGroup;
  email: any;
  password: any;
  isRememberMe: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private userService: UserService) {
    window.onbeforeunload = function() { return "Your work will be lost."; };

    let rememberAdmin = localStorage.getItem('REMEMBER_ADMIN');
    let rememberUser = localStorage.getItem('REMEMBER_USER');
    if (rememberAdmin !== null) {
      this.router.navigate(['/admin']);
    }

    if (rememberUser !== null) {
      this.router.navigate(['/dashboard']);
    }
  }

  ngOnInit() {
    this.reactiveSignInForm();
  }

  reactiveSignInForm() {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get f() {
    return this.signInForm.controls;
  }


  onSubmitLogin() {
    localStorage.removeItem('REMEMBER_USER');
    localStorage.removeItem('REMEMBER_ADMIN');

    this.submittedLoginForm = true;
    if (this.signInForm.invalid) {
      return;
    }

    this.loading();

    let body = {
      'email': this.email,
      'password': this.password
    };

    if (this.email.trim() === 'admin@smartplan.com' && this.password.trim() === 'admin@123#') {
      if (this.isRememberMe) {
        localStorage.setItem('REMEMBER_ADMIN', 'TRUE');
      }
      this.router.navigate(['/admin']);
    } else {
      this.userService.loginIn(body).subscribe(result => {
        if (result['success']) {
          if (this.isRememberMe) {
            localStorage.setItem('REMEMBER_USER', 'TRUE');
          }
          Swal.close();
          localStorage.setItem('$USER', JSON.stringify(result));
          localStorage.setItem('$LOG', 'LOGGED');
          localStorage.setItem('USER_ROLE', result['userRole']);
          localStorage.setItem('email', this.email);
          localStorage.setItem('numOfDays', result['numOfDays']);
          localStorage.setItem('password', this.password);
          localStorage.setItem('$id', result['id']);
          localStorage.setItem('$dailyReq', result['dailyReq']);
          localStorage.setItem('$gender', result['gender']);
          localStorage.setItem('$age', result['age']);
          localStorage.setItem('$email', result['email']);
          localStorage.setItem('$name', result['name']);
          localStorage.setItem('$password', result['password']);
          localStorage.setItem('$address_id', result['address']['id']);
          localStorage.setItem('workout', result['caloriePlanList'][0]['mealsPerDay']);
          localStorage.setItem('protein-workout', result['caloriePlanList'][0]['protein']);
          localStorage.setItem('non-workout', result['caloriePlanList'][1]['mealsPerDay']);
          localStorage.setItem('protein-non-workout', result['caloriePlanList'][1]['protein']);
          localStorage.setItem('$address_address', result['address']['address']);
          let dailyTarget1 = parseFloat(result['caloriePlanList'][0]['protein']) / parseFloat(result['caloriePlanList'][0]['mealsPerDay']);
          let dailyTarget2 = parseFloat(result['caloriePlanList'][1]['protein']) / parseFloat(result['caloriePlanList'][1]['mealsPerDay']);
          let dailyTarget = dailyTarget1 + dailyTarget2;

          localStorage.setItem('dailyTarget', dailyTarget.toString());

          this.router.navigate(['/dashboard']);

        } else {
          Swal.close();
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Login Failed!',
            showConfirmButton: false,
            timer: 1500
          })
        }
      }, () => {
        Swal.close();
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Something went wrong!',
          showConfirmButton: false,
          timer: 1500
        })
      });
    }

  }

  loading() {
    Swal.fire({
      title: 'Processing...',
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      }
    });
  }

  rememberMe(ev) {
    this.isRememberMe = ev.checked;
  }
}
