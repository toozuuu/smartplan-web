import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

import {
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatSliderModule,
  MatRadioModule,
  MatSlideToggleModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatTabsModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatMenuModule,
  MatIconModule,
  MatDialogModule
} from '@angular/material';
import { SelectGenderComponent } from './dashboard-components/select-gender/select-gender.component';
import { SelectAgeComponent } from './dashboard-components/select-age/select-age.component';
import { SelectGoalComponent } from './dashboard-components/select-goal/select-goal.component';
import { SelectPlanComponent } from './dashboard-components/select-plan/select-plan.component';
import { SelectFoodComponent } from './dashboard-components/select-food/select-food.component';
import { DashboardComponent } from './dashboard-components/dashboard/dashboard.component';
import {FormsModule} from "@angular/forms";
import { CheckoutComponent } from './dashboard-components/checkout/checkout.component';
import {MatCardModule} from "@angular/material/card";
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import {ChatModule} from "./chat";
import { HeaderComponent } from './dashboard-components/header/header.component';

@NgModule({
  declarations: [
    DashboardLayoutComponent,
    SelectGenderComponent,
    SelectAgeComponent,
    SelectGoalComponent,
    SelectPlanComponent,
    SelectFoodComponent,
    DashboardComponent,
    CheckoutComponent,
    HeaderComponent,
  ],
    imports: [
        CommonModule,
        NgxDaterangepickerMd.forRoot(),
        NgxMaterialTimepickerModule,
        DashboardRoutingModule,
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
        ChatModule,
    ]
})
export class DashboardMainModule { }
