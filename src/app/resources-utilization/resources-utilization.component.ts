import { ApplicationRef, Component, OnInit } from '@angular/core';
import { Tab } from '../tab';
import { Resource } from '../resource'
import { Special } from '../special'
import { Contact } from '../contact'
import { ServiceLog } from '../servicelog'
import * as restservice from '../rest.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { PopupElement } from '../popup-element';
import { ListData } from '../list-data';
import { ListCol } from '../list-col';
import { first } from 'rxjs/operators';
import { ListRow } from '../list-row';

@Component({
  selector: 'app-resources-utilization',
  templateUrl: './resources-utilization.component.html',
  styleUrls: ['./resources-utilization.component.css']
})
export class ResourcesUtilizationComponent implements OnInit {

	currentResource:Resource;
    currentTab:number;
    
    currentPopup:PopupElement

    resources:Resource[] = [];
    resources_list:ListData
    contacts_list:ListData
    misc_list:ListData

	hours = [];
	dates = [];
	tabs = [];

	time = [];
	currentHour:number;

    schedule = [];
    
    SwitchResource = (index:number) =>
    {
        this.currentResource = this.resources[index]
        this.FormLists()
    }

	constructor(public rest:restservice.RestService, private cookieService:CookieService, private router:Router, private appRef:ApplicationRef) { }

	ngOnInit(): void 
	{

        this.getResources()

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

		// this.currentResource = this.resources[2];

        // this.currentResource.specials = [
		// 	new Special("Коммуникации только по email", "20.03.2019"),
		// 	new Special("Коммуникации только по email", "20.03.2019"),
		// 	new Special("Коммуникации только по email", "20.03.2019")
        // ];
        
        // this.currentResource.contacts = [
		// 	new Contact(0, "Телефон",  "88005553535", "20.03.2020"),
		// 	new Contact(1, "Почта", "mail@gmail.com", "20.03.2020"),
		// 	new Contact(1, "WhatsApp", "88005553535", "20.03.2020")
		// ];

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

		this.currentTab = 0;

		this.tabs = [
			new Tab("profile", "Профиль"),
			new Tab("sales", "Продажи"),
			new Tab("load", "Загрузка"),
			new Tab("service", "Услуги"),
			new Tab("log", "Лог")
		];

        this.tabs[this.currentTab].Activate();

        this.currentPopup = new PopupElement("Title", "123")
    }

    goToResourceForm()
    {
        this.router.navigate(["resource"])
    }

    addMisc()
    {
        this.currentPopup = new PopupElement("Title", "123")
    }

    addContact()
    {
        alert("bbb")
    }

    getResources()
    {
        this.rest.getResources().subscribe((rest:any) => {
            let temp = rest

            for(let i = 0; i < temp.length; i++)
            {
                this.resources.push(new Resource(temp[i]))
            }

            this.currentResource = this.resources[0]
            this.FormLists()
            this.SwitchResource(0)
            this.appRef.tick()
            // setTimeout("", 1)
            this.SwitchResource(0)
        })
    }

    FormLists()
    {
        let res_cols = [
            new ListCol("Ресурс", "name"),
            new ListCol("Тип", "type", true),
            new ListCol("Утилизация", "util", true)
        ]

        let res_rows = []

        for(let i = 0; i < this.resources.length; i++)
        {
            res_rows.push(new ListRow([
                this.resources[i].shortname,
                this.resources[i].ResourceType.name,
                this.resources[i].util + "%"
            ]))
        }

        this.resources_list = new ListData(res_cols, res_rows, "resources")

        let misc_cols = [
            new ListCol("Особенность", "name"),
            new ListCol("Добавлено", "type")
        ]
        
        let misc_rows = []

        let misc = this.currentResource.Misc

        for(let i = 0; i < misc.length; i++)
        {
            misc_rows.push(new ListRow([misc[i].value, misc[i].date]))
        }
        
        this.misc_list = new ListData(misc_cols, misc_rows, "misc", "Особенности", true, "list__head_lined")

    //     <div class="list-row list-row_head contacts-list__head">
    //     <div class="list__num">#</div>
    //     <div class="list__name">Канал</div>
    //     <div class="list__type"><img src="assets/images/Sort_inactive.png" class="sort-image"> Номер \ Ник</div>
    //     <div class="list__name"><img src="assets/images/Sort_inactive.png" class="sort-image"> Последняя коммуникация</div>
    //     <div class="list__util"><img src="assets/images/Sort_inactive.png" class="sort-image"> Действие</div>
    // </div>
        // <div class="list__num">{{i + 1}}</div>
        //                     <div class="list__name">{{c.ContactType.name}}</div>
        //                     <div class="list__type">{{c.Contact}}</div>
        //                     <div class="list__name">{{c.lastdate}}</div>
        //                     <div class="list__util">
        //                         <div *ngIf="c.ContactType.action == 'phone'">
        //                             <button class="button contact-button" (click)="alert('Вызов API клиента: ' + c.ContactType.action)"><img src="assets/images/Call.svg" class="button__image"> Позвонить</button>
        //                             <img src="assets/images/Dots.svg" class="status-column__dots list__dots">
        //                         </div>
        //                         <div *ngIf="c.ContactType.action != 'phone'">
        //                             <button class="button contact-button" (click)="alert('Вызов API клиента: ' + c.ContactType.action)"><img src="assets/images/Write.svg" class="button__image"> Написать</button>
        //                             <img src="assets/images/Dots.svg" class="status-column__dots list__dots">
        //                         </div> 
        //                     </div>


        let contacts_cols = [
            new ListCol("Канал", "name"),
            new ListCol("Номер \ Ник", "type", true),
            new ListCol("Последняя коммуникация", "name", true),
            new ListCol("Действие", "util", true),
        ]

        let contacts_rows = []

        let contacts = this.currentResource.Contacts

        for(let i = 0; i < contacts.length; i++)
        {
            contacts_rows.push(new ListRow([
                contacts[i].ContactType.name,
                contacts[i].Contact,
                "",
                ""
            ]))
        }

        this.contacts_list = new ListData(contacts_cols, contacts_rows, "contacts", "Контакты", true, "list__head_lined")
    }

    getResourceTypes()
    {

    }

    getOffices()
    {
        
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

    public alert(msg:string)
    {
        window.alert(msg)
    }


    public ShowEditMenu()
    {
        let block = document.getElementById("edit-menu");

        block.className = "edit-menu";
    }

    public HideEditMenu()
    {
        let block = document.getElementById("edit-menu");
        block.className = "edit-menu _hidden";
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