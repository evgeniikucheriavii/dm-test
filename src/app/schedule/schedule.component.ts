import { ApplicationRef, Component, OnInit } from '@angular/core';
import { Tab, TabsData } from '../tabs/tabs.component';
import { Client } from '../client';
import * as restservice from '../rest.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { PopupElement } from '../popup-element';
import { ListData, ListCol, ListRow, ListOptions, ListButton } from '../list/list.component';
import { Formatter } from '../formatter';
import { ProfileData } from '../profile/profile.component';
import { DropdownItem, DropdownList } from '../dropdown/dropdown.component';
import { TimeData } from '../time-table/time-table.component';
import { htmlAstToRender3Ast } from '@angular/compiler/src/render3/r3_template_transform';

@Component({
	selector: 'app-schedule',
	templateUrl: './schedule.component.html',
	styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit 
{
	dates = [];


    cats = [];
    schedules = []

	constructor(public rest:restservice.RestService, private cookieService:CookieService, private router:Router, private appRef:ApplicationRef) { }

	ngOnInit(): void 
	{
		this.dates = [
			{ date: "26.09", name: "Пн" },
			{ date: "27.09", name: "Вт" },
			{ date: "28.09", name: "Ср" },
			{ date: "29.09", name: "Чт" },
			{ date: "30.09", name: "Пт" },
			{ date: "31.09", name: "Сб" },
			{ date: "01.09", name: "Вс" },
			{ date: "02.09", name: "Пн" },
			{ date: "03.09", name: "Вт" },
		];

        this.getSchedule()

		// let hr = { name: "Трудовые", resources: [
		// 	new Resource("Калиниченко Д.С.", 140, 40, 100, [
		// 		{ date: "01.07", task: 1 },
		// 		{ date: "02.07", task: 1 },
		// 		{ date: "03.07", task: 1 },
		// 		{ date: "04.07", task: 1 },
		// 		{ date: "05.07", task: null },
		// 		{ date: "06.07", task: null },
		// 		{ date: "07.07", task: null },
		// 		{ date: "08.07", task: 1 },
		// 		{ date: "09.07", task: 1 }
		// 	]),
		// 	new Resource("Колесов А.В.", 160, 20, 150, [
		// 		{ date: "01.07", task: 1 },
		// 		{ date: "02.07", task: 1 },
		// 		{ date: "03.07", task: 1 },
		// 		{ date: "04.07", task: 1 },
		// 		{ date: "05.07", task: 1 },
		// 		{ date: "06.07", task: null },
		// 		{ date: "07.07", task: null },
		// 		{ date: "08.07", task: 1 },
		// 		{ date: "09.07", task: 1 }
		// 	]),
		// 	new Resource("Гринченко М.А.", 140, 20, 13, [
		// 		{ date: "01.07", task: 1 },
		// 		{ date: "02.07", task: 1 },
		// 		{ date: "03.07", task: null },
		// 		{ date: "04.07", task: 1 },
		// 		{ date: "05.07", task: 1 },
		// 		{ date: "06.07", task: null },
		// 		{ date: "07.07", task: null },
		// 		{ date: "08.07", task: null },
		// 		{ date: "09.07", task: 1 }
		// 	])
		// ] };

		// let tech = { name: "Оборудование", resources: [
		// 	new Resource("Аппарат Экзарта", 140, 40, 100, [
		// 		{ date: "01.07", task: 0 },
		// 		{ date: "02.07", task: 1 },
		// 		{ date: "03.07", task: 0 },
		// 		{ date: "04.07", task: null },
		// 		{ date: "05.07", task: null },
		// 		{ date: "06.07", task: null },
		// 		{ date: "07.07", task: null },
		// 		{ date: "08.07", task: 0 },
		// 		{ date: "09.07", task: 0 }
		// 	]),
		// 	new Resource("Платформа Гелилео", 160, 20, 150, [
		// 		{ date: "01.07", task: 1 },
		// 		{ date: "02.07", task: 1 },
		// 		{ date: "03.07", task: 1 },
		// 		{ date: "04.07", task: 0 },
		// 		{ date: "05.07", task: 1 },
		// 		{ date: "06.07", task: null },
		// 		{ date: "07.07", task: null },
		// 		{ date: "08.07", task: 1 },
		// 		{ date: "09.07", task: 0 }
		// 	]),
		// 	new Resource("Система #124", 140, 20, 13, [
		// 		{ date: "01.07", task: 1 },
		// 		{ date: "02.07", task: 1 },
		// 		{ date: "03.07", task: null },
		// 		{ date: "04.07", task: 1 },
		// 		{ date: "05.07", task: 1 },
		// 		{ date: "06.07", task: null },
		// 		{ date: "07.07", task: null },
		// 		{ date: "08.07", task: null },
		// 		{ date: "09.07", task: null }
		// 	])
		// ] };

		// this.cats = [ hr, tech ];

    }
    
    getSchedule()
    {
        this.rest.getWorkSchedule().subscribe((rest:restservice.IWorkSchedule[]) => {
            for(let i = 0; i < rest.length; i++)
            {
                this.schedules.push(rest[i])
            }
            
            this.FormSchedules()
            this.appRef.tick()
        })
    }

    FormSchedules()
    {
        let hr = []
        let tech = []

        for(let i = 0; i < this.schedules.length; i++)
        {
            if(this.schedules[i].Resource.ResourceType.id == "2")
            {
                tech.push(new ResourceSchedule(this.schedules[i]))
            }
            else
            {
                hr.push(new ResourceSchedule(this.schedules[i]))
            }
        }

        this.cats = [ 
            new ScheduleGroup("Трудовые", hr), 
            new ScheduleGroup("Оборудование", tech)
        ]
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

export class ScheduleGroup
{
    name:string
    items:ResourceSchedule[]

    constructor(name:string, items:ResourceSchedule[])
    {
        this.name = name
        this.items = items
    }
}

export class ResourceSchedule
{
    name:string
    hours:number[] = []
    plans:number[] = []

    plan:number
    worked:number
    left:number


    constructor(data:restservice.IWorkSchedule)
    {
        this.name = data.Resource.name
        let hours = data.dayworked.split(",")
        let plans = data.dayplan.split(",")

        for(let i = 0; i < hours.length; i++)
        {
            this.hours.push(Number(hours[i]))
            this.plans.push(Number(plans[i]))
        }

        this.plan = Number(data.plan)
        this.worked = Number(data.worked)
        this.left = this.plan - this.worked

    }
}