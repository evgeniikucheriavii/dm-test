import { Component, OnInit } from '@angular/core';
import * as restservice from '../rest.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit 
{
	links = [];
    messages:number;
    loged:boolean

	constructor(public rest:restservice.RestService, private cookieService:CookieService, private router:Router) { }

	ngOnInit(): void 
	{
		this.messages = 1;

        if(this.cookieService.get("token") == "" || this.cookieService.get("token") == null)
        {
            this.loged = false
            this.validateLogin()
        }
        else
        {
            this.loged = true
        }

        this.links = 
		[
			new NavLink("Утилизация ресурсов", "/utilization"),
			new NavLink("Динамическое ценообразование", "/prices"),
			new NavLink("Рекомендательный движок", "/recomendations"),
			new NavLink("Расписания", "/schedules", [
				new NavLink("Рабочий график", "/schedules"),
				new NavLink("Расписание компании", "/company-schedules")
			]),
			new NavLink("Клиенты", "/clients"),
			new NavLink("RFM", "/rfm"),
			new NavLink("Справочник", "/help")
		];
    }
    
    validateLogin()
    {
        if(this.cookieService.get("token") == "" || this.cookieService.get("login") == null)
        {
            this.router.navigate(["/login"])
            // document.location.reload()
            // window.stop()
        }
        else 
        {
            
        }
    }
}

class NavLink
{
	static classNames:string = "nav-item nav-item_left";
	static activeClassName:string = "nav-item_active";

	name:string;
	link:string;
	isActive:boolean = false;

	children = [];
	
	constructor(name:string, link:string, children:any = [])
	{
		this.name = name;
		this.link = link;
		this.children = children;
	}

	CheckChildren()
	{
		if(this.children.length > 0)
		{
			for(let i = 0; i < this.children.length; i++)
			{
				if(this.children[i].isActive)
				{
					this.isActive = true;
					break;
				}
			}
		}
	}
}
