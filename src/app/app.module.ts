import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HashLocationStrategy, PathLocationStrategy, LocationStrategy } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

import { AppComponent } from './app.component';
import { CookieService } from 'ngx-cookie-service'
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ResourcesUtilizationComponent } from './resources-utilization/resources-utilization.component';
import { ClientsComponent } from './clients/clients.component';
import { RecomendationsEngineComponent } from './recomendations-engine/recomendations-engine.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { PricesComponent } from './prices/prices.component';
import { CompanyScheduleComponent } from './company-schedule/company-schedule.component';
import { HelpComponent } from './help/help.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { ExitComponent } from './exit/exit.component';
import { ResourceFormComponent } from './resource-form/resource-form.component';
import { MiscFormComponent } from './misc-form/misc-form.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { PopupComponent } from './popup/popup.component';
import { ContactsListComponent } from './contacts-list/contacts-list.component';
import { ListComponent } from './list/list.component';
import { ContextComponent } from './context/context.component';
import { TabsComponent } from './tabs/tabs.component';
// import { AppRoutingModule } from './app-routing.module';

const appRoutes = [
	{ path: '', component: HomeComponent },
	{ path: 'utilization', component: ResourcesUtilizationComponent },
	{ path: 'prices', component: PricesComponent },
	{ path: 'recomendations', component: RecomendationsEngineComponent },
	{ path: 'schedules', component: ScheduleComponent },
	{ path: 'company-schedules', component: CompanyScheduleComponent },
	{ path: 'clients', component: ClientsComponent },
	{ path: 'help', component: HelpComponent },
	{ path: 'resource', component: ResourceFormComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'exit', component: ExitComponent },
	{ path: 'list', component: ListComponent },
];

@NgModule({
  declarations: [
	AppComponent,	
    NavBarComponent,
    ResourcesUtilizationComponent,
    ClientsComponent,
    RecomendationsEngineComponent,
    ScheduleComponent,
    PricesComponent,
    CompanyScheduleComponent,
    HelpComponent,
    HomeComponent,
    LoginComponent,
    ExitComponent,
    ResourceFormComponent,
    MiscFormComponent,
    ContactFormComponent,
    DropdownComponent,
    PopupComponent,
    ContactsListComponent,
    ListComponent,
    ContextComponent,
    TabsComponent,
  ],
  imports: [
	BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    // AppRoutingModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [
	  AppComponent
	]
})
export class AppModule { }
