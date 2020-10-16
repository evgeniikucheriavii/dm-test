import { ApplicationRef, Component, OnInit } from '@angular/core';
import { Tab } from '../tab';
import { Special } from '../special'
import { Contact } from '../contact'
import { ServiceLog } from '../servicelog'
import { Client } from '../client';
import * as restservice from '../rest.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { PopupElement } from '../popup-element';
import { ListData } from '../list-data';
import { ListCol } from '../list-col';
import { ListRow } from '../list-row';

@Component({
	selector: 'app-clients',
	templateUrl: './clients.component.html',
	styleUrls: ['./clients.component.css']
})

export class ClientsComponent implements OnInit 
{
	tabs = [];
	sections = [];

    clients:Client[] = [];
    
    contacts_list:ListData
	
	currentClient:Client;
	currentTab:number;

	constructor(public rest:restservice.RestService, private cookieService:CookieService, private router:Router, private appRef:ApplicationRef) { }

	ngOnInit(): void 
	{
        this.getClients()

		// this.clients = [
		// 	new Client("Иванов Иван", 1231, 44000),
		// 	new Client("Сидоров Сергей", 1231, 63000),
		// 	new Client("Колесов А. В.", 1131, 50000),
		// 	new Client("Петрова Светлана", 3212, 7200),
		// 	new Client("Баярова Алина", 2122, 22500),
		// 	new Client("Аппарат Экзарта", 2312, 50345),
		// 	new Client("Платформа Галилео", 1231, 63000),       
		// 	new Client("Петрова Светлана", 1231, 50000),
		// 	new Client("Баярова Алина", 1131, 7200),
		// 	new Client("Петрова Светлана", 3212, 22500),
		// 	new Client("Аппарат Экзарта", 2122, 50345),
		// 	new Client("Платформа Галилео", 2312, 7200),
		// 	new Client("Петрова Светлана", 1131, 22500),
		// 	new Client("Аппарат Экзарта", 3212, 50345)
		// ];

        // this.currentClient = this.clients[2];
        
        // this.currentClient.services = [
		// 	new ServiceLog("Консультативный прием", "30 минут", 1500),
		// 	new ServiceLog("Консультативный прием", "30 минут", 1500),
		// 	new ServiceLog("Консультативный прием", "30 минут", 1500),
		// 	new ServiceLog("Консультативный прием", "30 минут", 1500),
		// 	new ServiceLog("Консультативный прием", "30 минут", 1500),
		// 	new ServiceLog("Консультативный прием", "30 минут", 1500),
		// 	new ServiceLog("Консультативный прием", "30 минут", 1500),
		// 	new ServiceLog("Консультативный прием", "30 минут", 1500),
		// 	new ServiceLog("Консультативный прием", "30 минут", 1500),
		// 	new ServiceLog("Консультативный прием", "30 минут", 1500),
		// 	new ServiceLog("Консультативный прием", "30 минут", 1500),
		// 	new ServiceLog("Консультативный прием", "30 минут", 1500),
		// 	new ServiceLog("Консультативный прием", "30 минут", 1500),
		// 	new ServiceLog("Консультативный прием", "30 минут", 1500),
		// 	new ServiceLog("Консультативный прием", "30 минут", 1500),
		// 	new ServiceLog("Консультативный прием", "30 минут", 1500),
		// 	new ServiceLog("Консультативный прием", "30 минут", 1500),
		// 	new ServiceLog("Консультативный прием", "30 минут", 1500),
		// 	new ServiceLog("Консультативный прием", "30 минут", 1500),
		// 	new ServiceLog("Консультативный прием", "30 минут", 1500),
		// 	new ServiceLog("Консультативный прием", "30 минут", 1500),
		// 	new ServiceLog("Консультативный прием", "30 минут", 1500)
		// ];

		// this.currentClient.log = [
		// 	new LogEntry("Консультативный прием", "Массаж 45 минут", "Колесов А.В.", "22.01.2020", true),
		// 	new LogEntry("Детский консультативный прием", "Вибрационная терапия", "Калиниченко Д.С", "12.02.2019", true),
		// 	new LogEntry("Электростатический массаж", "Тейпирование", "Колесов А.В.", "11.05.2018", true),
		// 	new LogEntry("Коррекция ортопедическиз стелек", "Массаж 45 минут", "Калиниченко Д.С", "22.01.2020", true),
		// 	new LogEntry("Консультативный прием", "Вибрационная терапия", "Колесов А.В.", "12.02.2019", true),
		// 	new LogEntry("Детский консультативный прием", "Тейпирование", "Калиниченко Д.С", "11.05.2018", true),
		// 	new LogEntry("Консультативный прием", "Массаж 45 минут", "Колесов А.В.", "22.01.2020", true),
		// 	new LogEntry("Коррекция ортопедическиз стелек", "Вибрационная терапия", "Калиниченко Д.С", "12.02.2019", true),
		// 	new LogEntry("Лечебная физкультура", "Тейпирование", "Колесов А.В.", "11.05.2018", true),
		// 	new LogEntry("Лечебная физкультура", "Вибрационная терапия", "Калиниченко Д.С", "22.01.2020", true),
		// 	new LogEntry("Консультативный прием", "Массаж 45 минут", "Калиниченко Д.С", "12.02.2019", true),
		// 	new LogEntry("Детский консультативный прием", "Вибрационная терапия", "Калиниченко Д.С", "11.05.2018", true),
		// 	new LogEntry("Консультативный прием", "Тейпирование", "Калиниченко Д.С", "22.01.2020", true),
		// 	new LogEntry("Коррекция ортопедическиз стелек", "Вибрационная терапия", "Калиниченко Д.С", "12.02.2019", true),
		// 	new LogEntry("Консультативный прием", "Массаж 45 минут", "Колесов А.В.", "11.05.2018", true)
		// ];

		// this.currentClient.contacts = [
		// 	new Contact(0, "Телефон",  "88005553535", "20.03.2020"),
		// 	new Contact(1, "Почта", "mail@gmail.com", "20.03.2020"),
		// 	new Contact(1, "WhatsApp", "88005553535", "20.03.2020")
		// ];

		// this.currentClient.transactions = [
		// 		new TransactionLog("Массаж 45 минут", "Колесов А. В.", 1500, "20.03.2020"),
		// 		new TransactionLog("Вибрационная терапия", "Колесов А. В.", 1500, "20.03.2020"),
		// 		new TransactionLog("Прием врача", "Колесов А. В.", 1500, "20.03.2020"),
		// 		new TransactionLog("Массаж 45 минут", "Колесов А. В.", 1500, "20.03.2020"),
		// 		new TransactionLog("Вибрационная терапия", "Колесов А. В.", 1500, "20.03.2020"),
		// 		new TransactionLog("Прием врача", "Колесов А. В.", 1500, "20.03.2020"),
		// 		new TransactionLog("Прием врача", "Колесов А. В.", 1500, "20.03.2020"),
		// 		new TransactionLog("Прием врача", "Колесов А. В.", 1500, "20.03.2020"),
		// 		new TransactionLog("Прием врача", "Колесов А. В.", 1500, "20.03.2020"),
		// 		new TransactionLog("Прием врача", "Колесов А. В.", 1500, "20.03.2020")
		// ];

		// this.currentClient.specials = [
		// 	new Special("Коммуникации только по email", "20.03.2019"),
		// 	new Special("Коммуникации только по email", "20.03.2019"),
		// 	new Special("Коммуникации только по email", "20.03.2019")
		// ];

		this.tabs = [
			new Tab("profile", "Профиль"),
			new Tab("sales", "Покупки"),
			new Tab("reserve", "Бронирование"),
			new Tab("log", "История обращений")
		];

		this.currentTab = 0;

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
    
    getClients()
    {
        this.rest.getClientsByCompanyId("1").subscribe((rest:any) => {
            let temp = rest

            for(let i = 0; i < temp.length; i++)
            {
                this.clients.push(new Client(temp[i]))
            }

            
            this.SwitchClient(0)
            this.appRef.tick()
            this.SwitchClient(0)
            this.FormLists()
        })
    }

    FormLists()
    {
        let rows = []
        // let contacts = this.currentClient.Contacts
        let misc = this.currentClient.Misc

        for(let i = 0; i < misc.length; i++)
        {
            rows.push(new ListRow([misc[i].value, misc[i].date]))
        }

        this.contacts_list = new ListData(
            [
                new ListCol("Особенность", "name"),
                new ListCol("Добавлено", "name"),
            ], 
            rows, 
            "contacts",
            "Особенности", 
            true,
            "list__head_lined"
            )
    }

    SwitchClient(index:number)
    {
        this.currentClient = this.clients[index]

        let items = document.getElementsByClassName("list-row_client")

        for(let i = 0; i < items.length; i++)
        {
            items[i].className = "list-row list-row_client"

            if(i == index)
            {
                items[i].className = "list-row list-row_client list-row_active"
            }
        }
    }
}

class TransactionLog
{
	service:string;
	master:string;
	date:string;
	sum:number;

	constructor(service:string, master:string, sum:number, date:string)
	{
		this.service = service;
		this.master = master;
		this.sum = sum;
		this.date = date;
	}
}

class LogEntry
{
	query:string;
	service:string;
	master:string;

	date:string;

	status:boolean;
	statusString:string;

	constructor(query:string, service:string, master:string, date:string, status:boolean)
	{
		this.query = query;
		this.service = service;
		this.master = master;
		this.date = date;
		this.status = status;

		if(this.status)
		{
			this.statusString = "Закрыта";
		} 
		else 
		{
			this.statusString = "Открыта";
		}
	}
}

