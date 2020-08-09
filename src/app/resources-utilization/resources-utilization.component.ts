import { Component, OnInit } from '@angular/core';
import { Tab } from '../tab';

@Component({
  selector: 'app-resources-utilization',
  templateUrl: './resources-utilization.component.html',
  styleUrls: ['./resources-utilization.component.css']
})
export class ResourcesUtilizationComponent implements OnInit {

	currentResource:Resource;
	currentTab:number;

	resources = [];
	hours = [];
	dates = [];
	tabs = [];

	constructor() { }

	ngOnInit(): void 
	{
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

		this.currentResource = this.resources[2];

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

		this.currentResource.services = [
			new ServiceLog("Консультативный прием", "30 минут", 1500),
			new ServiceLog("Консультативный прием", "30 минут", 1500),
			new ServiceLog("Консультативный прием", "30 минут", 1500),
			new ServiceLog("Консультативный прием", "30 минут", 1500),
			new ServiceLog("Консультативный прием", "30 минут", 1500),
			new ServiceLog("Консультативный прием", "30 минут", 1500),
			new ServiceLog("Консультативный прием", "30 минут", 1500),
			new ServiceLog("Консультативный прием", "30 минут", 1500),
			new ServiceLog("Консультативный прием", "30 минут", 1500),
			new ServiceLog("Консультативный прием", "30 минут", 1500),
			new ServiceLog("Консультативный прием", "30 минут", 1500),
			new ServiceLog("Консультативный прием", "30 минут", 1500),
			new ServiceLog("Консультативный прием", "30 минут", 1500),
			new ServiceLog("Консультативный прием", "30 минут", 1500),
			new ServiceLog("Консультативный прием", "30 минут", 1500),
			new ServiceLog("Консультативный прием", "30 минут", 1500),
			new ServiceLog("Консультативный прием", "30 минут", 1500),
			new ServiceLog("Консультативный прием", "30 минут", 1500),
			new ServiceLog("Консультативный прием", "30 минут", 1500),
			new ServiceLog("Консультативный прием", "30 минут", 1500),
			new ServiceLog("Консультативный прием", "30 минут", 1500),
			new ServiceLog("Консультативный прием", "30 минут", 1500)
		];
		


		this.currentTab = 0;

		this.tabs = [
			new Tab("contacts", "Загрузка"),
			new Tab("reserve", "Услуги"),
			new Tab("log", "Лог")
		];

		this.tabs[this.currentTab].Activate();
	}

	public SwitchTab(index:number)
	{
		if(index <= this.tabs.length)
		{
			this.currentTab = index;

			for(let i = 0; i < this.tabs.length; i++)
			{
				this.tabs[i].Deactivate();
			}

			this.tabs[this.currentTab].Activate();
		}
	}

}

class Resource
{
	name:string;
	type:string;
	util:number;
	color:string;

	services = [];

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

class ServiceLog
{
	service:string;
	duration:string;
	sum:number;

	sumFormat:string;

	constructor(service:string, duration:string, sum:number)
	{
		this.service = service;
		this.sum = sum;
		this.duration = duration;

		this.sumFormat = this.Format(this.sum);
	}

	private Format(value:number)
	{
		let nfObject = new Intl.NumberFormat('ru-RU');
		let output = nfObject.format(value);

		return output; 
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