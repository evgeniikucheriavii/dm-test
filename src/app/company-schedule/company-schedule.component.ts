import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-company-schedule',
	templateUrl: './company-schedule.component.html',
	styleUrls: ['./company-schedule.component.css']
})
export class CompanyScheduleComponent implements OnInit 
{

	calendar:Calendar;
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
			new Resource("Калиниченко Д.С.", [
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
			new Resource("Колесов А.В.", [
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

			new Resource("Гринченко М.А.", [
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

			new Resource("Аппарат Экзарта", [
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

			new Resource("Гринченко М.А.", [
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

}

class Resource
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


class Calendar
{
	weeks = [];


}