import {NgModule} from '@angular/core';
import {LoginComponent} from './public/login/login.component';
import {SignupComponent} from './public/signup/signup.component';
import {ChatModule} from "./dashboard-main/chat";
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    preloadingStrategy: PreloadAllModules
  }),
    ChatModule],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
