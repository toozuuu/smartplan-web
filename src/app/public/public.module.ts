import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SlickCarouselModule} from 'ngx-slick-carousel';
import {NgxDropzoneModule} from 'ngx-dropzone';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxDaterangepickerMd} from 'ngx-daterangepicker-material';

import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {RouterModule} from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxDaterangepickerMd.forRoot(),
    ReactiveFormsModule,
    SlickCarouselModule,
    NgxDropzoneModule,
    NgxMaterialTimepickerModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule
  ]
})
export class PublicModule { }
