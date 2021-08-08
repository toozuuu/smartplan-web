import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './public/login/login.component';
import {SignupComponent} from './public/signup/signup.component';
import {ChatConfigComponent, ChatModule, ChatWidgetComponent} from "./dashboard-main/chat";

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    ChatModule],
  exports: [RouterModule],
  entryComponents: [
    ChatWidgetComponent,
    ChatConfigComponent
  ],
})
export class AppRoutingModule {
}
