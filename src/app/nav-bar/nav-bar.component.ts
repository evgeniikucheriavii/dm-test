import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit 
{
	links = [];
	messages:number;

	constructor() { }

	ngOnInit(): void 
	{
		this.messages = 1;

		this.links = 
		[
			new NavLink("Утилизация ресурсов", "/utilization"),
			new NavLink("Динамическое ценообразование", "/prices"),
			new NavLink("Рекомендательный движок", "/recomendations"),
			new NavLink("Расписания", "/schedules"),
			new NavLink("Клиенты", "/clients"),
			new NavLink("Справочник", "/help")
		];
	}
}

class NavLink
{
	static classNames:string = "nav-item nav-item_left";
	static activeClassName:string = "nav-item_active";

	name:string;
	link:string;
	isActive:boolean = false;
	
	constructor(name:string, link:string)
	{
		this.name = name;
		this.link = link;
	}
}
