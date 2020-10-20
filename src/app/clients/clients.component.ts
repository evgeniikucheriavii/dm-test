import { ApplicationRef, Component, OnInit } from '@angular/core';
import { Tab, TabsData } from '../tabs/tabs.component';
import { Special } from '../special'
import { Contact } from '../contact'
import { ServiceLog } from '../servicelog'
import { Client } from '../client';
import * as restservice from '../rest.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { PopupElement } from '../popup-element';
import { ListData, ListCol, ListRow } from '../list/list.component';

@Component({
	selector: 'app-clients',
	templateUrl: './clients.component.html',
	styleUrls: ['./clients.component.css']
})

export class ClientsComponent implements OnInit 
{
	tabsdata:TabsData
	sections = [];

    clients:Client[] = [];

    clients_list:ListData    
    contacts_list:ListData
    misc_list:ListData
	
	currentClient:Client;

    SwitchClient = (index:number) =>
    {
        this.currentClient = this.clients[index]
        this.FormLists()
    }

    SwitchTab = (index:number) =>
	{
		// this.currentTab = index
    }

	constructor(public rest:restservice.RestService, private cookieService:CookieService, private router:Router, private appRef:ApplicationRef) { }

	ngOnInit(): void 
	{
        this.getClients()
        
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

	    let tabs = [
			new Tab("profile", "Профиль"),
			new Tab("sales", "Покупки"),
			new Tab("reserve", "Бронирование"),
			new Tab("log", "История обращений")
        ];
        
        this.tabsdata = new TabsData("clients", tabs)
	}
    
    getClients()
    {
        this.rest.getClientsByCompanyId("1").subscribe((rest:any) => {
            let temp = rest

            for(let i = 0; i < temp.length; i++)
            {
                this.clients.push(new Client(temp[i]))
            }

            this.currentClient = this.clients[0]
            this.FormLists()
            this.SwitchClient(0)
            this.appRef.tick()
        })
    }

    FormLists()
    {
        let clients_cols = [
            new ListCol("ФИО", "name"),
            new ListCol("Акции", "type", true),
            new ListCol("RFM", "util", true),
            new ListCol("LTV", "util", true)
        ]

        let clients_rows = []
    //         <div class="list-row list-row_client" *ngFor="let c of clients; let i = index" (click)="SwitchClient(i)">
    //             <div class="list__num">{{i + 1}}</div>
    //             <div class="list__name">{{c.shortname}}</div>
    //             <div class="list__type"><label class="box-label box-label_checkbox"><input type="checkbox" class="box-label__input box-label__input_checkbox"></label></div>
    //             <div class="list__util">{{c.rfm}}</div>
    //             <div class="list__util">{{c.ltvString}}</div>
    //         </div>
    //     </div>
    // </section>


        for(let i = 0; i < this.clients.length; i++)
        {
            clients_rows.push(new ListRow([
                this.clients[i].shortname,
                // this.clients[i].,
                "",
                this.clients[i].rfm + "",
                this.clients[i].ltvString,
            ]))
        }

        this.clients_list = new ListData(
            clients_cols, 
            clients_rows,
            "clients"
        )

        let misc_rows = []
       
        let misc = this.currentClient.Misc

        for(let i = 0; i < misc.length; i++)
        {
            misc_rows.push(new ListRow([misc[i].value, misc[i].date]))
        }

        this.misc_list = new ListData(
            [
                new ListCol("Особенность", "name"),
                new ListCol("Добавлено", "name"),
            ], 
            misc_rows, 
            "contacts",
            "Особенности", 
            true,
            "list__head_lined"
            )

        let contacts_cols = [
            new ListCol("Канал", "name"),
            new ListCol("Номер \ Ник", "type", true),
            new ListCol("Последняя коммуникация", "name", true),
            new ListCol("Действие", "util", true),
        ]

        let contacts_rows = []

        let contacts = this.currentClient.Contacts

        for(let i = 0; i < contacts.length; i++)
        {
            let comm = "никогда"

            if(Number(contacts[i].LastCommunication.id) > 0)
            {
                comm = contacts[i].LastCommunication.datetime + ""
            }
            
            contacts_rows.push(new ListRow([
                contacts[i].ContactType.name,
                contacts[i].Contact,
                comm,
                ""
            ]))
        }

        this.contacts_list = new ListData(contacts_cols, contacts_rows, "contacts", "Контакты", true, "list__head_lined")
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

