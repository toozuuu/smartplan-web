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
import {UsersComponent} from './admin-component/users/users.component';
import {ChatboxComponent} from './admin-component/chatbox/chatbox.component';
import {AdminOrdersComponent} from './admin-component/admin-orders/admin-orders.component';
import {UnitTypeComponent} from './admin-component/unit-type/unit-type.component';
import {AdminSettingComponent} from './admin-component/admin-setting/admin-setting.component';
import {AdminLoginComponent} from "./admin-component/admin-login/admin-login.component";

@NgModule({
  declarations: [
    AdminDashboardComponent,
    MealsComponent,
    UsersComponent,
    ChatboxComponent,
    AdminOrdersComponent,
    UnitTypeComponent,
    AdminLoginComponent,
    AdminSettingComponent],
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
export class AdminModule {
}
