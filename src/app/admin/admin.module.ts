import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
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
import {AdminSettingsComponent} from './admin-component/admin-settings/admin-settings.component';
import {AdminLoginComponent} from "./admin-component/admin-login/admin-login.component";
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    MealsComponent,
    UsersComponent,
    ChatboxComponent,
    AdminOrdersComponent,
    UnitTypeComponent,
    AdminLoginComponent,
    AdminSettingsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    AdminRoutingModule,
    NgxDropzoneModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule
  ]
})
export class AdminModule {
}
