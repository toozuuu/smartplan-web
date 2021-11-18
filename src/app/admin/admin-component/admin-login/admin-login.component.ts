import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from "../../../service/user.service";

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  submittedLoginForm = false;
  loginForm: FormGroup;
  loginUsername: any;
  loginPassword: any;
  tenantValue: any;
  version: string;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router
  ) {
    this.tenantValue = localStorage.getItem('TENANT_VALUE');
  }

  ngOnInit() {
    this.version = '0.1V';
    this.reactiveLoginForm();
  }

  reactiveLoginForm() {
    this.loginForm = this.formBuilder.group({
      loginUsername: ['', Validators.required],
      loginPassword: ['', Validators.required],
    });
  }

  get f1() {
    return this.loginForm.controls;
  }

  onSubmitLogin() {
    this.submittedLoginForm = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.userLogin();
  }

  userLogin() {
    if (this.loginPassword !== undefined && this.loginUsername !== undefined) {
      localStorage.setItem('$LOG', 'LOGGED');
      let _loginBody = {
        'email': this.loginUsername,
        'password': this.loginPassword
      };
      this.userService.adminLoginIn(_loginBody).subscribe(result => {
        if(result['isLogged']){
          this.router.navigate(['/admin-dashboard']);
        }
      });

    }

  }


}
