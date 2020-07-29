import { Component, OnInit } from '@angular/core';
import { Tab } from '../tab';

@Component({
	selector: 'app-recomendations-engine',
	templateUrl: './recomendations-engine.component.html',
	styleUrls: ['./recomendations-engine.component.css']
})
export class RecomendationsEngineComponent implements OnInit 
{
	tabs = [];
	currentTab:number;

	rules = [];
	currentRule:Rule;

	resources = [];

	searchLog = [];

	data = [];

	constructor() { }

	ngOnInit(): void 
	{
		this.tabs = [
			new Tab("utilization-rules", "Правила экстренной утилизации"),
			new Tab("actions", "Action Center")
		];

		this.currentTab = 1;

		this.tabs[this.currentTab].Activate();

		this.rules = [
			new Rule("За 2 дня до утилизации", 30),
			new Rule("За 1 день до утилизации", 40),
			new Rule("В день утилизации", 50)
		];

		this.currentRule = this.rules[2];

		this.resources = [
			new Rule("Если ресурс >60% до цели ", 0),
			new Rule("Если ресурс 60<40% до цели ", 0),
			new Rule("Если ресурс 40<20% до цели ", 0),
			new Rule("Если ресурс 20<0% до цели ", 0),
			new Rule("Если ресурс 0<20% сверху цели ", 0),
			new Rule("Если ресурс 20%<40% сверху цели ", 0),
			new Rule("Если ресурс 40%<60% сверху цели", 0),
			new Rule("Если ресурс 60% сверху цели", 0)
		];


		this.searchLog = [
			new SearchLog(11, "12.06 14.03", "Иванов Иван", 0),
			new SearchLog(10, "12.06 14.03", "Иванов Иван", 1),
			new SearchLog(9, "12.06 14.03", "Иванов Иван", 2),
			new SearchLog(8, "12.06 14.03", "Иванов Иван", 0),
			new SearchLog(7, "12.06 14.03", "Иванов Иван", 1),
			new SearchLog(6, "12.06 14.03", "Иванов Иван", 2),
			new SearchLog(5, "12.06 14.03", "Иванов Иван", 0),
			new SearchLog(4, "12.06 14.03", "Иванов Иван", 1),
			new SearchLog(3, "12.06 14.03", "Иванов Иван", 2),
			new SearchLog(2, "12.06 14.03", "Иванов Иван", 0),
			new SearchLog(1, "12.06 14.03", "Иванов Иван", 1)
		];

		this.data = [
			new Resource("Иванов Иван", "Массаж 45 минут", "13.06.2020 13:00 - 14:00", 5, 0),
			new Resource("Иванов Иван", "Массаж 45 минут", "13.06.2020 13:00 - 14:00", 13, 0),
			new Resource("Иванов Иван", "Массаж 45 минут", "13.06.2020 13:00 - 14:00", 5, 0),
			new Resource("Иванов Иван", "Массаж 45 минут", "13.06.2020 13:00 - 14:00", 2, 0),
			new Resource("Иванов Иван", "Массаж 45 минут", "13.06.2020 13:00 - 14:00", 4, 0),
			new Resource("Иванов Иван", "Массаж 45 минут", "13.06.2020 13:00 - 14:00", 5, 1),
			new Resource("Иванов Иван", "Массаж 45 минут", "13.06.2020 13:00 - 14:00", 15, 0),
			new Resource("Иванов Иван", "Массаж 45 минут", "13.06.2020 13:00 - 14:00", 32, 1),
			new Resource("Иванов Иван", "Массаж 45 минут", "13.06.2020 13:00 - 14:00", 2, 0),
			new Resource("Иванов Иван", "Массаж 45 минут", "13.06.2020 13:00 - 14:00", 7, 1),
			new Resource("Иванов Иван", "Массаж 45 минут", "13.06.2020 13:00 - 14:00", 2, 0),
			new Resource("Иванов Иван", "Массаж 45 минут", "13.06.2020 13:00 - 14:00", 5, 1),
			new Resource("Иванов Иван", "Массаж 45 минут", "13.06.2020 13:00 - 14:00", 5, 1),
			new Resource("Иванов Иван", "Массаж 45 минут", "13.06.2020 13:00 - 14:00", 5, 1),
			new Resource("Иванов Иван", "Массаж 45 минут", "13.06.2020 13:00 - 14:00", 5, 1),
			new Resource("Иванов Иван", "Массаж 45 минут", "13.06.2020 13:00 - 14:00", 5, 1),
			new Resource("Иванов Иван", "Массаж 45 минут", "13.06.2020 13:00 - 14:00", 5, 1),
			new Resource("Иванов Иван", "Массаж 45 минут", "13.06.2020 13:00 - 14:00", 5, 1),
			new Resource("Иванов Иван", "Массаж 45 минут", "13.06.2020 13:00 - 14:00", 5, 1),
		];
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

	public PriorityClick()
	{
		let priority = document.getElementById("priority");

		if(priority.className == "priority")
		{
			priority.className = "priority priority_active";
		}
		else
		{
			priority.className = "priority";
		}
	}
}


class Rule
{
	title:string;
	discount:number;

	constructor(title:string, discount:number)
	{
		this.title = title;
		this.discount = discount;
	}
}

class SearchLog
{
	id:number;
	date:string;
	client:string;
	status:number;

	constructor(id:number, date:string, client:string, status:number)
	{
		this.id = id;
		this.date = date;
		this.client = client;
		this.status = status;
	}
}

class Resource
{
	name:string;
	service:string;
	interval:string;
	vote:number;
	status:number;

	constructor(name:string, service:string, interval:string, vote:number, status:number)
	{
		this.name = name;
		this.service = service;
		this.interval = interval;
		this.vote = vote;
		this.status = status;
	}
}