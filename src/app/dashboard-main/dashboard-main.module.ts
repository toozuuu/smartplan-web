import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardLayoutComponent} from './dashboard-layout/dashboard-layout.component';
import {DashboardRoutingModule} from './dashboard-routing.module';

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
import {SelectGenderComponent} from './dashboard-components/select-gender/select-gender.component';
import {SelectAgeComponent} from './dashboard-components/select-age/select-age.component';
import {SelectGoalComponent} from './dashboard-components/select-goal/select-goal.component';
import {SelectPlanComponent} from './dashboard-components/select-plan/select-plan.component';
import {SelectFoodComponent} from './dashboard-components/select-food/select-food.component';
import {DashboardComponent} from './dashboard-components/dashboard/dashboard.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CheckoutComponent} from './dashboard-components/checkout/checkout.component';
import {MatCardModule} from '@angular/material/card';
import {NgxDaterangepickerMd} from 'ngx-daterangepicker-material';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {ChatModule} from './chat';
import {HeaderComponent} from './dashboard-components/header/header.component';
import {ProductViewComponent} from './dashboard-components/product-view/product-view.component';
import {CartComponent} from './dashboard-components/cart/cart.component';
import {FooterComponent} from './dashboard-components/footer/footer.component';
import {OrdersComponent} from './dashboard-components/orders/orders.component';
import {MatBadgeModule} from '@angular/material/badge';
import {ProfileComponent} from './dashboard-components/profile/profile.component';

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
    ProductViewComponent,
    CartComponent,
    FooterComponent,
    OrdersComponent,
    ProfileComponent,
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
      ReactiveFormsModule,
      MatSortModule,
      MatPaginatorModule,
      MatMenuModule,
      MatIconModule,
      MatDialogModule,
      FormsModule,
      MatCardModule,
      ChatModule,
      MatBadgeModule,
    ]
})
export class DashboardMainModule { }
