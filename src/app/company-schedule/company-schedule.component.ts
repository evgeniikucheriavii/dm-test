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
		

		this.schedule = [
			new Resource("name", [
				new Schedule(9, [
					new Task("Task", 0, 15),
					new Task("Task", 15, 15),
					new Task("Task", 30, 15),
					new Task("Task", 45, 15)
				]),
				new Schedule(10, [
					new Task("Task", 0, 60)
				]),
				new Schedule(15, [
					new Task("Task", 0, 15),
					new Task("Task", 15, 15),
					new Task("Task", 30, 15)
				]),
			]),
			new Resource("name", [
				new Schedule(9, [
					new Task("Task", 0, 15),
					new Task("Task", 15, 15),
					new Task("Task", 30, 15),
					new Task("Task", 45, 15)
				]),
				new Schedule(10, [
					new Task("Task", 0, 60)
				]),
				new Schedule(15, [
					new Task("Task", 0, 15),
					new Task("Task", 15, 15),
					new Task("Task", 30, 15)
				]),
			]),

			new Resource("name", [
				new Schedule(15, [
					new Task("Task", 0, 15),
					new Task("Task", 15, 15),
					new Task("Task", 30, 15),
					new Task("Task", 45, 15)
				]),
				new Schedule(17, [
					new Task("Task", 0, 60)
				]),
				new Schedule(19, [
					new Task("Task", 0, 15),
					new Task("Task", 15, 15),
					new Task("Task", 30, 15)
				]),
			]),

			new Resource("name", [
				new Schedule(12, [
					new Task("Task", 0, 15),
					new Task("Task", 15, 15),
					new Task("Task", 30, 15),
					new Task("Task", 45, 15)
				]),
				new Schedule(16, [
					new Task("Task", 0, 60)
				]),
				new Schedule(20, [
					new Task("Task", 0, 15),
					new Task("Task", 15, 15),
					new Task("Task", 30, 15)
				]),
			]),

			new Resource("name", [
				new Schedule(15, [
					new Task("Task", 0, 15),
					new Task("Task", 15, 15),
					new Task("Task", 30, 15),
					new Task("Task", 45, 15)
				]),
				new Schedule(17, [
					new Task("Task", 0, 60)
				]),
				new Schedule(19, [
					new Task("Task", 0, 15),
					new Task("Task", 15, 15),
					new Task("Task", 30, 15)
				]),
			]),
		];
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

	constructor(name:string, start:number, duration:number)
	{
		this.name = name;
		this.start = start;
		this.duration = duration;
	}
}


class Calendar
{
	weeks = [];


}