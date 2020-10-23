import { ApplicationRef, Component, OnInit } from '@angular/core';
import { Tab, TabsData } from '../tabs/tabs.component';
import { Resource } from '../resource'
import { Special } from '../special'
import { Contact } from '../contact'
import { ServiceLog } from '../servicelog'
import * as restservice from '../rest.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { PopupElement } from '../popup-element';
import { ListData, ListCol, ListRow, ListButton, ListOptions } from '../list/list.component';
import { first } from 'rxjs/operators';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ResourceFormComponent } from '../resource-form/resource-form.component';

@Component({
  selector: 'app-resources-utilization',
  templateUrl: './resources-utilization.component.html',
  styleUrls: ['./resources-utilization.component.css']
})
export class ResourcesUtilizationComponent implements OnInit {

	currentResource:Resource;

    tabsdata:TabsData

    context_left:number = 100
    context_top:number = 100
    context_visibility:string = "_hidden"
    context_type:string = ""


    popupIndex:any
    popups:PopupElement[] = []
    currentPopup:PopupElement
    popupVisibility:string = "_hidden"

    resources:Resource[] = [];
    resources_list:ListData
    contacts_list:ListData
    misc_list:ListData
    services_list:ListData
    sales_list:ListData

    selected_misc:number = 0
    selected_contact:number = 0
    selected_resource:number = 0

	hours = [];
	dates = [];

	time = [];
	currentHour:number;

    schedule = [];
    
    SwitchResource = (index:number) =>
    {
        this.currentResource = this.resources[index]
        this.FormMiscList()
        this.FormContactsList()
        this.FormServicesList()
        this.FormSalesList()
    }

    SwitchTab = (index:number) =>
	{
        // this.tabsdata.currentTab = index;
    }

    MiscPopup = (obj:any, index:number) =>
    {
        obj.selected_misc = index
        obj.popupVisibility = ""
        obj.currentPopup = obj.popups[0]
    }

    ContactsPopup = (obj:any, index:number) =>
    {
        obj.selected_contact = index
        obj.currentPopup = obj.popups[1]
        obj.popupVisibility = ""
    }

    PopupCallback = (obj:any, index:number) =>
    {
        let r = obj.selected_resource
        obj.getResources()
        obj.SwitchResource(r)
    }

    MiscContext = (obj:any, index:number) =>
    {
        this.context_visibility = ""
    }

    ContactsContext = (obj:any, index:number) =>
    {
        this.context_visibility = ""
    }

    ContextCallback = (obj:any, data:any) =>
    {

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

		let tabs = [
			new Tab("profile", "Профиль"),
			new Tab("sales", "Продажи"),
			new Tab("load", "Загрузка"),
			new Tab("service", "Услуги"),
			new Tab("log", "Лог")
        ];
        
        this.tabsdata = new TabsData("resources", tabs)

        this.popups = [
            new PopupElement("Особенности", "sdasd1", "misc_form"),
            new PopupElement("Контакты", "sdasd2", "contacts_form"),
            new PopupElement("Новый ресурс", "sdasd3", "resource_form"),
            new PopupElement("Услуги", "sdasd4", "service_form"),
        ]

        this.currentPopup = this.popups[0]
    }

    goToResourceForm()
    {
        this.currentPopup = this.popups[2]
        this.popupVisibility = ""
    }

    addMisc()
    {
        // this.currentPopup = new PopupElement("Title", "123")
        this.currentPopup = this.popups[0]
        this.popupVisibility = ""
        this.popupIndex = this.currentResource.id
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
        })
    }

    FormLists()
    {
        this.FormResourcesList()

        this.FormMiscList()

        this.FormContactsList()

        this.FormServicesList()

        this.FormSalesList()
    }

    FormSalesList()
    {
        let cols = [
            new ListCol("Услуга", "name"),
            new ListCol("Клиент", "type", true),
            new ListCol("Стоимость", "pmin", true),
            new ListCol("Дата и время", "pmin", true)
        ]

        let rows = []
        let showId = true

        let booking = this.currentResource.Booking
        
        if(booking.length == 0)
        {
            rows.push(new ListRow(["Нет данных"]))
            showId = false
        }

        for(let i = 0; i < booking.length; i++)
        {
            let product = ""

            for(let k = 0; k < this.currentResource.Products.length; k++)
            {
                if(this.currentResource.Products[k].id == booking[i].Product)
                {
                    product = this.currentResource.Products[k].name
                    break
                }
            }

            let dt = this.FormatDate(booking[i].datetime)

            rows.push(new ListRow([
                product,
                booking[i].Client.name,
                booking[i].actualprice,
                dt
            ]))
        }

        let sales_options = new ListOptions(showId, true)

        this.sales_list = new ListData(cols, rows, "sales", "", sales_options)
    }

    FormatDate(date:string)
    {
        let d = new Date(date)

        let dN = d.getDay()
        let day = ""

        if (Number(dN) < 10)
        {
            day = "0" + String(dN)
        }

        let mN = d.getMonth()
        let month = ""

        if (Number(mN) < 10)
        {
            month = "0" + String(mN)
        }



        return  day + "." + month + "." + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes()
    }

    FormServicesList()
    {
        let cols = [
            new ListCol("Услуга", "name"),
            new ListCol("Частота", "pmax", true),
            new ListCol("Длительность", "pmin", true),
            new ListCol("Востребованность", "pmax", true),
            new ListCol("Стоимость (руб)", "pmax", true),
        ]

        let rows = []

        let products = this.currentResource.Products
        let rates = this.currentResource.Rates

        for(let i = 0; i < products.length; i++)
        {
            let price = Number(products[i].price)

            for(let j = 0; j < rates.length; j++)
            {
                if(rates[j].Product == products[i].id)
                {
                    price *= Number(rates[j].ratio)
                    break;
                }
            }

            rows.push(new ListRow([
                products[i].name, 
                products[i].regularity + "", 
                products[i].duration, 
                products[i].demand + "",
                price + ""
            ]))
        }

        let service_options = new ListOptions(true, true)

        this.services_list = new ListData(cols, rows, "services", "", service_options)


    }

    FormResourcesList()
    {
        let res_cols = [
            new ListCol("Ресурс", "name"),
            new ListCol("Тип", "type", true),
            new ListCol("Утилизация", "util", true)
        ]

        let res_rows = []

        for(let i = 0; i < this.resources.length; i++)
        {
            let classes = "_" + this.resources[i].color + " _centered";

            res_rows.push(new ListRow([
                this.resources[i].shortname,
                this.resources[i].ResourceType.name,    
                "<span class='" + classes + "'>" + this.resources[i].util + "%</span>"
            ]))
        }

        this.resources_list = new ListData(res_cols, res_rows, "resources")
    }

    FormMiscList()
    {
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

        let misc_options = new ListOptions(true, true)
        
        this.misc_list = new ListData(misc_cols, misc_rows, "misc", "Особенности", misc_options)
    }

    FormContactsList()
    {

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
            let comm = "никогда"

            if(Number(contacts[i].LastCommunication.id) > 0)
            {
                comm = contacts[i].LastCommunication.datetime + ""
            }
            
            let btn = null

            if(contacts[i].ContactType.action == "phone")
            {
                btn = new ListButton("Позвонить", "Call")
            }
            else
            {
                btn = new ListButton("Написать", "Write")
            }

            contacts_rows.push(new ListRow([
                contacts[i].ContactType.name,
                contacts[i].Contact,
                comm,
                btn
            ]))
        }

        let contacts_options = new ListOptions(true, true)

        this.contacts_list = new ListData(contacts_cols, contacts_rows, "contacts", "Контакты", contacts_options)
    }

    getResourceTypes()
    {

    }

    getOffices()
    {
        
    }

    public alert(msg:string)
    {
        window.alert(msg)
    }

    public Communicate(obj:any, index:number)
    {
        let api = obj.currentResource.Contacts[index].ContactType.action
        window.alert("API Call: " + api)
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