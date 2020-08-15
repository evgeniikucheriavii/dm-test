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

	time = [];
	currentHour:number;

	schedule = [];

	constructor() { }

	ngOnInit(): void 
	{
		this.time = [
			{ hour: 9 },
			{ hour: 10 },
			{ hour: 11 },
			{ hour: 12 },
			{ hour: 13 },
			{ hour: 14 },
			{ hour: 15 },
			{ hour: 16 },
			{ hour: 17 },
			{ hour: 18 },
			{ hour: 19 },
			{ hour: 20 }
		];

		this.currentHour = 14;

		this.schedule = [
			new Day("12.06", [
				new Schedule(9, [
					new Task("Task", 0, 15, 0),
					new Task("Task", 15, 15, 0),
					new Task("Task", 30, 15, 0),
					new Task("Task", 45, 15, 0)
				]),
				new Schedule(10, [
					new Task("Task", 0, 60, 1)
				]),
				new Schedule(15, [
					new Task("Task", 0, 15, 0),
					new Task("Task", 15, 15, 2),
					new Task("Task", 30, 15, 3)
				]),
			]),
			new Day("13.06", [
				new Schedule(9, [
					new Task("Task", 0, 15, 0),
					new Task("Task", 15, 15, 1),
					new Task("Task", 30, 15, 2),
					new Task("Task", 45, 15, 3)
				]),
				new Schedule(10, [
					new Task("Task", 0, 60, 0)
				]),

				new Schedule(15, [
					new Task("Task", 0, 15, 0),
					new Task("Task", 15, 15, 0),
					new Task("Task", 30, 15, 0)
				]),

				new Schedule(17, [
					new Task("Task", 0, 60, 1)
				]),
			]),

			new Day("14.06", [
				new Schedule(15, [
					new Task("Task", 0, 15, 0),
					new Task("Task", 15, 15, 0),
					new Task("Task", 30, 15, 3),
					new Task("Task", 45, 15, 0)
				]),
				new Schedule(17, [
					new Task("Task", 0, 60, 0),
				]),
				new Schedule(19, [
					new Task("Task", 0, 15, 0),
					new Task("Task", 15, 15, 0),
					new Task("Task", 30, 15, 0)
				]),
			]),

			new Day("15.06", [
				new Schedule(12, [
					new Task("Task", 0, 15, 1),
					new Task("Task", 15, 15, 1),
					new Task("Task", 30, 15, 1),
					new Task("Task", 45, 15, 1)
				]),
				new Schedule(16, [
					new Task("Task", 0, 60, 0)
				]),
				new Schedule(20, [
					new Task("Task", 0, 15, 0),
					new Task("Task", 15, 15, 0)
				]),
			]),

			new Day("16.06", [
				new Schedule(15, [
					new Task("Task", 0, 15, 0),
					new Task("Task", 15, 15, 2),
					new Task("Task", 30, 15, 2),
					new Task("Task", 45, 15, 0)
				]),
				new Schedule(17, [
					new Task("Task", 0, 60, 0)
				]),
				new Schedule(19, [
					new Task("Task", 0, 15, 3),
					new Task("Task", 15, 15, 3),
					new Task("Task", 30, 15, 3)
				]),
			]),
		];

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
		


		this.currentTab = 2;

		this.tabs = [
			new Tab("profile", "Профиль"),
			new Tab("sales", "Продажи"),
			new Tab("load", "Загрузка"),
			new Tab("service", "Услуги"),
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


	IsCurrentHour(hour:number)
	{
		if(this.currentHour == hour)
		{
			return true;
		}
		else
		{
			return false;
		}
	}

	GetRowClass(hour:number)
	{
		if(this.currentHour > hour)
		{
			return "_past-hour";
		} 
		else if(this.currentHour == hour)
		{
			return "_current-hour";
		}
		else
		{
			return "_future-hour";
		}
		
	}

	ScrollTable(d:number)
	{
		let step = 100;

		let table = document.getElementById("schedule-table");

		let maxScrollLeft = table.scrollWidth - table.clientWidth;

		let leftScroll = document.getElementById("left-scroll");
		let rightScroll = document.getElementById("right-scroll");

		table.scrollTo(table.scrollLeft + (step * d), 0);

		this.CheckScroll();
	}

	CheckScroll()
	{
		let table = document.getElementById("schedule-table");

		let maxScrollLeft = table.scrollWidth - table.clientWidth;

		let leftScroll = document.getElementById("left-scroll");
		let rightScroll = document.getElementById("right-scroll");

		if(table.scrollLeft == 0)
		{
			leftScroll.setAttribute("disabled", "disabled");
		}
		else
		{
			leftScroll.removeAttribute("disabled");
		}

		if(table.scrollLeft == maxScrollLeft)
		{
			rightScroll.setAttribute("disabled", "disabled");
		}
		else
		{
			rightScroll.removeAttribute("disabled");
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

/* Load */


class Day
{
	name:string;

	schedule = [];

	constructor(name:string, schedule:any)
	{
		this.name = name;
		this.schedule = schedule;
	}

	HasTasks(hour:number)
	{
		let has = false;

		for(let i = 0; i < this.schedule.length; i++)
		{
			if(this.schedule[i].hour == hour)
			{
				has = true;
				break;
			}
		}

		return has;
	}

	GetTasks(hour:number)
	{
		let tasks = [];

		for(let i = 0; i < this.schedule.length; i++)
		{
			if(this.schedule[i].hour == hour)
			{
				tasks = this.schedule[i];
				break;
			}
		}

		return tasks;
	}
}

class Schedule
{
	hour:number;
	
	tasks = [];

	isFull:boolean = false;

	constructor(hour:number, tasks:any)
	{
		this.hour = hour;
		this.tasks = tasks;

		this.Check();
	}

	Check()
	{
		let duration = 0;

		for(let i = 0; i < this.tasks.length; i ++)
		{
			duration += this.tasks[i].duration;
		}

		if(duration == 60) 
			return true;
		else 
			return false;
	}
}

class Task
{
	start:number;
	duration:number;

	name:string;

	type:number;
	typeClass:string;

	sizeClass:string;

	constructor(name:string, start:number, duration:number, type:number)
	{
		this.name = name;
		this.start = start;
		this.duration = duration;
		this.type = type;

		switch(this.type)
		{
			case 0: this.typeClass = "legend_promo"; break;
			case 1: this.typeClass = "legend_service"; break;
			case 2: this.typeClass = "legend_reserve"; break;
			case 3: this.typeClass = "legend_fail"; break;
		}

		if(this.duration >= 15 && this.duration < 30)
		{
			this.sizeClass = "task_small";
		}
		else if(this.duration >= 30 && this.duration < 45)
		{
			this.sizeClass = "task_medium";
		}
		else if(this.duration >= 45 && this.duration < 60)
		{
			this.sizeClass = "task_large";
		}
		else
		{
			this.sizeClass = "task_huge";
		}
	}

	Classes()
	{
		return this.typeClass + " " + this.sizeClass; 
	}
}


/* */