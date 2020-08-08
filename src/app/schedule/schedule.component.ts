import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-schedule',
	templateUrl: './schedule.component.html',
	styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit 
{
	dates = [];


	cats = [];

	constructor() { }

	ngOnInit(): void 
	{
		this.dates = [
			{ date: "01.07", name: "Пн" },
			{ date: "02.07", name: "Вт" },
			{ date: "03.07", name: "Ср" },
			{ date: "04.07", name: "Чт" },
			{ date: "05.07", name: "Пт" },
			{ date: "06.07", name: "Сб" },
			{ date: "07.07", name: "Вс" },
			{ date: "08.07", name: "Пн" },
			{ date: "09.07", name: "Вт" },
		];

		let hr = { name: "Трудовые", resources: [
			new Resource("Калиниченко Д.С.", 140, 40, 100, [
				{ date: "01.07", task: 1 },
				{ date: "02.07", task: 1 },
				{ date: "03.07", task: 1 },
				{ date: "04.07", task: 1 },
				{ date: "05.07", task: null },
				{ date: "06.07", task: null },
				{ date: "07.07", task: null },
				{ date: "08.07", task: 1 },
				{ date: "09.07", task: 1 }
			]),
			new Resource("Колесов А.В.", 160, 20, 150, [
				{ date: "01.07", task: 1 },
				{ date: "02.07", task: 1 },
				{ date: "03.07", task: 1 },
				{ date: "04.07", task: 1 },
				{ date: "05.07", task: 1 },
				{ date: "06.07", task: null },
				{ date: "07.07", task: null },
				{ date: "08.07", task: 1 },
				{ date: "09.07", task: 1 }
			]),
			new Resource("Гринченко М.А.", 140, 20, 13, [
				{ date: "01.07", task: 1 },
				{ date: "02.07", task: 1 },
				{ date: "03.07", task: null },
				{ date: "04.07", task: 1 },
				{ date: "05.07", task: 1 },
				{ date: "06.07", task: null },
				{ date: "07.07", task: null },
				{ date: "08.07", task: null },
				{ date: "09.07", task: 1 }
			])
		] };

		let tech = { name: "Оборудование", resources: [
			new Resource("Аппарат Экзарта", 140, 40, 100, [
				{ date: "01.07", task: 0 },
				{ date: "02.07", task: 1 },
				{ date: "03.07", task: 0 },
				{ date: "04.07", task: null },
				{ date: "05.07", task: null },
				{ date: "06.07", task: null },
				{ date: "07.07", task: null },
				{ date: "08.07", task: 0 },
				{ date: "09.07", task: 0 }
			]),
			new Resource("Платформа Гелилео", 160, 20, 150, [
				{ date: "01.07", task: 1 },
				{ date: "02.07", task: 1 },
				{ date: "03.07", task: 1 },
				{ date: "04.07", task: 0 },
				{ date: "05.07", task: 1 },
				{ date: "06.07", task: null },
				{ date: "07.07", task: null },
				{ date: "08.07", task: 1 },
				{ date: "09.07", task: 0 }
			]),
			new Resource("Система #124", 140, 20, 13, [
				{ date: "01.07", task: 1 },
				{ date: "02.07", task: 1 },
				{ date: "03.07", task: null },
				{ date: "04.07", task: 1 },
				{ date: "05.07", task: 1 },
				{ date: "06.07", task: null },
				{ date: "07.07", task: null },
				{ date: "08.07", task: null },
				{ date: "09.07", task: null }
			])
		] };

		this.cats = [ hr, tech ];

	}

	ToggleCat(index:number)
	{
		console.log(index);
		let toggle = document.getElementById("cat-toggle_" + index);
		let body = document.getElementById("cat-body_" + index);

		if(toggle.innerHTML == "+")
		{
			body.className = "cat-body";
			toggle.innerHTML = "-";
		}
		else
		{
			body.className = "cat-body _hidden";
			toggle.innerHTML = "+";
		}
	}

}

class Resource
{
	name:string;

	plan:number;
	done:number;
	left:number;

	activities = [];

	constructor(name:string, plan:number, done:number, left:number, activities:any)
	{
		this.name = name;
		this.plan = plan;
		this.done = done;
		this.left = left;
		this.activities = activities;
	}

}

