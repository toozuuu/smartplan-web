import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardLayoutComponent} from './dashboard-layout/dashboard-layout.component';
import {SelectGenderComponent} from './dashboard-components/select-gender/select-gender.component';
import {SelectAgeComponent} from './dashboard-components/select-age/select-age.component';
import {SelectGoalComponent} from './dashboard-components/select-goal/select-goal.component';
import {SelectPlanComponent} from './dashboard-components/select-plan/select-plan.component';
import {SelectFoodComponent} from './dashboard-components/select-food/select-food.component';
import {DashboardComponent} from './dashboard-components/dashboard/dashboard.component';
import {AuthGuard} from "../auth/auth-guard.service";
import {CheckoutComponent} from './dashboard-components/checkout/checkout.component';
import {ProductViewComponent} from "./dashboard-components/product-view/product-view.component";
import {CartComponent} from "./dashboard-components/cart/cart.component";
import {OrdersComponent} from "./dashboard-components/orders/orders.component";

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'gender',
        component: SelectGenderComponent,
      },
      {
        path: 'age',
        component: SelectAgeComponent,
      },
      {
        path: 'goal',
        component: SelectGoalComponent,
      },
      {
        path: 'plan',
        component: SelectPlanComponent,
      },
      {
        path: 'food',
        component: SelectFoodComponent,
      },
      {
        path: 'checkout',
        component: CheckoutComponent,
      },
      {
        path: 'product-view',
        component: ProductViewComponent,
      },
      {
        path: 'cart',
        component: CartComponent,
      },
      {
        path: 'orders',
        component: OrdersComponent,
      },
      {
        path: 'refresh-checkout',
        component: CheckoutComponent,
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
