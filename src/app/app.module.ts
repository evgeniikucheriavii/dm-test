import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ResourcesUtilizationComponent } from './resources-utilization/resources-utilization.component';
import { ClientsComponent } from './clients/clients.component';
import { RecomendationsEngineComponent } from './recomendations-engine/recomendations-engine.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { PricesComponent } from './prices/prices.component';
import { CompanyScheduleComponent } from './company-schedule/company-schedule.component';
import { HelpComponent } from './help/help.component';
import { HomeComponent } from './home/home.component';

const appRoutes = [
	{ path: '', component: HomeComponent },
	{ path: 'utilization', component: ResourcesUtilizationComponent },
	{ path: 'prices', component: PricesComponent },
	{ path: 'recomendations', component: RecomendationsEngineComponent },
	{ path: 'schedules', component: ScheduleComponent },
	{ path: 'company-schedules', component: CompanyScheduleComponent },
	{ path: 'clients', component: ClientsComponent },
	{ path: 'help', component: HelpComponent }
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
  ],
  imports: [
	BrowserModule,
	RouterModule.forRoot(appRoutes)
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [
	  AppComponent
	]
})
export class AppModule { }
