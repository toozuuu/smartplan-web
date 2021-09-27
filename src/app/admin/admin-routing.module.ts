import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { MealsComponent } from './admin-component/meals/meals.component';
import {UsersComponent} from './admin-component/users/users.component';
import {ChatboxComponent} from "./admin-component/chatbox/chatbox.component";
import {AdminOrdersComponent} from "./admin-component/admin-orders/admin-orders.component";
const routes: Routes = [
  {
    path: 'admin',
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
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
