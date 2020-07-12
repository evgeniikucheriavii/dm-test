import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ResourcesUtilizationComponent } from './resources-utilization/resources-utilization.component';

const appRoutes = [
	{ path: '', component: AppComponent },
	{ path: 'utilization', component: ResourcesUtilizationComponent },
	{ path: 'prices', component: AppComponent },
	{ path: 'schedules', component: AppComponent },
	{ path: 'clients', component: AppComponent },
	{ path: 'help', component: AppComponent }
];

@NgModule({
  declarations: [
	AppComponent,	
    NavBarComponent,
    ResourcesUtilizationComponent,
  ],
  imports: [
	BrowserModule,
	RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [
	  AppComponent
	]
})
export class AppModule { }
