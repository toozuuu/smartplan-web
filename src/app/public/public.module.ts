import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SlickCarouselModule} from 'ngx-slick-carousel';
import {NgxDropzoneModule} from 'ngx-dropzone';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxDaterangepickerMd} from 'ngx-daterangepicker-material';

import {
  MatButtonModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatRadioModule,
  MatSelectModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatTooltipModule
} from '@angular/material';

import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxDaterangepickerMd.forRoot(),
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSliderModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    MatTableModule,
    MatSortModule,
    MatDialogModule,
    MatMenuModule,
    MatPaginatorModule,
    SlickCarouselModule,
    NgxDropzoneModule,
    NgxMaterialTimepickerModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class PublicModule { }
