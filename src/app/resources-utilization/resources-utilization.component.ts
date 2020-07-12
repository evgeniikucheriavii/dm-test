import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resources-utilization',
  templateUrl: './resources-utilization.component.html',
  styleUrls: ['./resources-utilization.component.css']
})
export class ResourcesUtilizationComponent implements OnInit {

	currentResource:string;

	resources = [];
	hours = [];
	dates = [];

	constructor() { }

	ngOnInit(): void 
	{
		this.currentResource = "Колесов А. В.";

		this.resources =
		[
			new Resource("Иванов Иван", "Трудовой", 15),
			new Resource("Сидоров Сергей", "Трудовой", 10),
			new Resource("Колесов А. В.", "Трудовой", 12),
			new Resource("Петрова Светлана", "Трудовой", 5),
			new Resource("Баярова Алина", "Трудовой", 22),
			new Resource("Аппарат Экзарта", "Трудовой", 31),
			new Resource("Платформа Галилео", "Оборудование", 3),
			new Resource("Петрова Светлана", "Оборудование", 18),
			new Resource("Баярова Алина", "Оборудование", 22),
			new Resource("Петрова Светлана", "Трудовой", 33),
			new Resource("Аппарат Экзарта", "Трудовой", 15),
			new Resource("Платформа Галилео", "Трудовой", 10),
			new Resource("Петрова Светлана", "Оборудование", 12),
			new Resource("Аппарат Экзарта", "Оборудование", 5)
		];

		this.dates =
		[
			new DateGraph("12.06", 15),
			new DateGraph("13.06", 20),
			new DateGraph("14.06", 30),
			new DateGraph("15.06", 10),
			new DateGraph("16.06", 40),
			new DateGraph("17.06", 30),
			new DateGraph("18.06", 45)
		];

		this.hours = [ 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21 ];
	}

}

class Resource
{
	name:string;
	type:string;
	util:number;
	color:string;

	constructor(name:string, type:string, util:number)
	{
		this.name = name;
		this.type = type;
		this.util = util;

		if(util <= 10)
		{
			this.color = "red";
		}
		else if(util > 10 && util < 16)
		{
			this.color = "brown";
		}
		else if(util > 16 && util < 30)
		{
			this.color = "lgreen";
		}
		else if(util >= 30 && util < 40)
		{
			this.color = "green";
		}
		else 
		{
			this.color = "bgreen";
		}
	}
}

class DateGraph
{
	date:string;
	util:number;
	color:string;

	constructor(date:string, util:number)
	{
		this.date = date;
		this.util = util;

		if(util <= 10)
		{
			this.color = "red";
		}
		else if(util > 10 && util < 16)
		{
			this.color = "brown";
		}
		else if(util > 16 && util < 30)
		{
			this.color = "lgreen";
		}
		else if(util >= 30 && util < 40)
		{
			this.color = "green";
		}
		else 
		{
			this.color = "bgreen";
		}
	}
}