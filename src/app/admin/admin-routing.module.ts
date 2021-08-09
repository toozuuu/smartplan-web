import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { MealsComponent } from './admin-component/meals/meals.component';
import {UsersComponent} from './admin-component/users/users.component';
import {SettingsComponent} from "./admin-component/settings/settings.component";
import {ChatboxComponent} from "./admin-component/chatbox/chatbox.component";
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
        path: 'user',
        component: UsersComponent
      },
      {
        path: 'setting',
        component: SettingsComponent
      },
      {
        path: 'chat',
        component: ChatboxComponent
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
