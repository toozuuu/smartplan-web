import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DashboardMainModule} from './dashboard-main/dashboard-main.module';
import {MatIconModule} from '@angular/material/icon';
import {PublicModule} from './public/public.module';
import {HttpClientModule} from "@angular/common/http";
import {AdminModule} from './admin/admin.module';
import {BackButtonDisableModule} from "angular-disable-browser-back-button";
import {BnNgIdleService} from "bn-ng-idle";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PublicModule,
    DashboardMainModule,
    AdminModule,
    MatIconModule,
    HttpClientModule,
    BackButtonDisableModule.forRoot()
  ],
  providers: [BnNgIdleService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
