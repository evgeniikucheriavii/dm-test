import { ApplicationRef, Component, OnInit } from '@angular/core';
import { Tab, TabsData } from '../tabs/tabs.component';
import { Client } from '../client';
import * as restservice from '../rest.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { PopupElement } from '../popup-element';
import { ListData, ListCol, ListRow, ListOptions } from '../list/list.component';
import { Formatter } from '../formatter';

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
    sales_list:ListData
	
	currentClient:Client;

    SwitchClient = (index:number) =>
    {
        this.currentClient = this.clients[index]
        this.FormContactsList()
        this.FormMiscList()
        this.FormSalesList()
    }

    SwitchTab = (index:number) =>
	{
		// this.currentTab = index
    }

	constructor(public rest:restservice.RestService, private cookieService:CookieService, private router:Router, private appRef:ApplicationRef) { }

	ngOnInit(): void 
	{
        this.getClients()

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
        this.FormClientsList()
        this.FormContactsList()
        this.FormMiscList()
        this.FormSalesList()
    }

    FormClientsList()
    {
        let clients_cols = [
            new ListCol("ФИО", "name"),
            new ListCol("Акции", "type", true),
            new ListCol("RFM", "util", true),
            new ListCol("LTV", "util", true)
        ]

        let clients_rows = []


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
    }

    FormSalesList()
    {
        let sales_cols = [
            new ListCol("Услуга", "name"),
            new ListCol("Клиент", "type", true),
            new ListCol("Стоимость", "pmin", true),
            new ListCol("Дата и время", "pmin", true)
        ]

        let sales_rows = []

        let sales = this.currentClient.Booking

        
        
        for(let i = 0; i < sales.length; i++)
        {
            let dt = Formatter.FormatDate(sales[i].datetime)

            sales_rows.push(new ListRow([
                product,
                booking[i].Client.name,
                booking[i].actualprice,
                dt
            ]))
        }

        let sales_options = new ListOptions(true, true)

        this.sales_list = new ListData(sales_cols, sales_rows, "sales", "", sales_options)
    }

    FormMiscList()
    {
        let misc_rows = []
       
        let misc = this.currentClient.Misc

        for(let i = 0; i < misc.length; i++)
        {
            misc_rows.push(new ListRow([misc[i].value, misc[i].date]))
        }

        let misc_options = new ListOptions(true, true)

        this.misc_list = new ListData(
            [
                new ListCol("Особенность", "name"),
                new ListCol("Добавлено", "name"),
            ], 
            misc_rows, 
            "contacts",
            "Особенности", 
            misc_options
            )
    }

    FormContactsList()
    {
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
        
        let clients_options = new ListOptions(true, true)

        this.contacts_list = new ListData(contacts_cols, contacts_rows, "contacts", "Контакты", clients_options)
    }
    
}
