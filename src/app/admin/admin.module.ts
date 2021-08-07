import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
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
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {AdminRoutingModule} from './admin-routing.module';
import {AdminDashboardComponent} from './admin-dashboard/admin-dashboard.component';
import {MealsComponent} from './admin-component/meals/meals.component';
import {NgxDropzoneModule} from 'ngx-dropzone';
import { UsersComponent } from './admin-component/users/users.component';

@NgModule({
  declarations: [
  AdminDashboardComponent,
  MealsComponent,
  UsersComponent],
    imports: [
        CommonModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatSliderModule,
        MatRadioModule,
        MatSlideToggleModule,
        MatCheckboxModule,
        MatChipsModule,
        MatTooltipModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatTabsModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatMenuModule,
        MatIconModule,
        MatDialogModule,
        FormsModule,
        MatCardModule,
        AdminRoutingModule,
        NgxDropzoneModule,
        ReactiveFormsModule
    ]
})
export class AdminModule { }
