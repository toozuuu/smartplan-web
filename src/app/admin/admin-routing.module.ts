import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { MealsComponent } from './admin-component/meals/meals.component';
import {UsersComponent} from './admin-component/users/users.component';
import {ChatboxComponent} from "./admin-component/chatbox/chatbox.component";
import {AdminOrdersComponent} from "./admin-component/admin-orders/admin-orders.component";
import {AdminSettingComponent} from "./admin-component/admin-setting/admin-setting.component";
import {AdminLoginComponent} from "./admin-component/admin-login/admin-login.component";
const routes: Routes = [
  {
    path:'admin',
    component:AdminLoginComponent
  },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    children: [
      {
        path: '',
        component: MealsComponent
      },
      {
        path: 'meal',
        component: MealsComponent
      },
      {
        path: 'unit-type',
        component: MealsComponent
      },
      {
        path: 'user',
        component: UsersComponent
      },
      {
        path: 'chat',
        component: ChatboxComponent
      },
      {
        path: 'order',
        component: AdminOrdersComponent
      },
      {
        path: 'settings',
        component: AdminSettingComponent
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
