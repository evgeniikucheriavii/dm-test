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
    offices:restservice.IOffice[] = []
    profile_data:ProfileData
    dropdowns:DropdownList[] = []
    timedata:TimeData

    clients_list:ListData    
    sales_list:ListData
    history_list:ListData
	
    currentClient:Client;
    
    loaded:boolean = false

    SwitchClient = (index:number) =>
    {
        this.currentClient = this.clients[index]
        this.FormProfile()
        this.FormSalesList()
        this.FormHistoryList()
        this.FormTime()
    }

    SwitchTab = (index:number) =>
	{
		// this.currentTab = index
    }

	constructor(public rest:restservice.RestService, private cookieService:CookieService, private router:Router, private appRef:ApplicationRef) { }

	ngOnInit(): void 
	{
        this.getOffices()
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
        this.rest.getClients().subscribe((rest:any) => {
            let temp = rest

            for(let i = 0; i < temp.length; i++)
            {
                this.clients.push(new Client(temp[i]))
            }

            this.currentClient = this.clients[0]
            this.FormLists()
            this.SwitchClient(0)
            this.appRef.tick()
            this.loaded = true
        })
    }

    FormTime()
    {
        this.timedata = new TimeData("client", this.currentClient.Booking)
    }

    FormLists()
    {
        this.FormClientsList()
        this.FormHistoryList()
        this.FormSalesList()
        this.FormTime()
    }

    getOffices()
    {
        this.rest.getOffices().subscribe((rest:any) => {
            for(let i = 0; i < rest.length; i++)
            {
                this.offices.push(rest[i])
            }

            this.appRef.tick()
        })
    }

    FormProfile()
    {
        this.profile_data = new ProfileData(this.currentClient, null)

        let offices_list = []
        let selected = -1

        for(let i = 0; i < this.offices.length; i++)
        {
            offices_list.push(new DropdownItem(this.offices[i].name, this.offices[i].id))
            // if(this.offices[i].id == this.currentClient.Office.id)
            // {
            //     selected = i
            // }
            
        }

        this.dropdowns = [
            new DropdownList("offices", "Офис", offices_list, selected),
            new DropdownList("status", "Статус", [
                new DropdownItem("Активен", "1"),
                new DropdownItem("В архиве", "2"),
            ], 0),
            new DropdownList("group", "группа", [
                new DropdownItem("Приоритет", "1"),
                new DropdownItem("Второстепенные", "2"),
            ], 0),
        ]
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
            let checked = ""

            if(this.clients[i].promo)
            {
                checked = "checked"
            }

            let promo = "<label class='box-label box-label_checkbox'><input type='checkbox' class='box-label__input box-label__input_checkbox' " + checked + "'></label>"


            clients_rows.push(new ListRow([
                this.clients[i].shortname,
                // this.clients[i].,
                promo,
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
            new ListCol("Ресурс", "type", true),
            new ListCol("Стоимость", "pmin", true),
            new ListCol("Дата и время", "pmin", true)
        ]

        let sales_rows = []

        
        let booking = this.currentClient.Booking

        let showId = true

        if(booking.length <= 0)
        {
            sales_rows.push(new ListRow(["Нет данных"]))
            showId = false
        }
        
        for(let i = 0; i < booking.length; i++)
        {
            if(String(booking[i].BookingStatus) == "2") 
            {
                let dt = Formatter.FormatDateTime(booking[i].datetime)
    
                sales_rows.push(new ListRow([
                    booking[i].Product.name,
                    booking[i].Resource.name,
                    booking[i].actualprice,
                    dt
                ]))
            }
            
        }
        

        let sales_options = new ListOptions(showId, true)

        this.sales_list = new ListData(
            sales_cols, 
            sales_rows, 
            "sales", 
            "", 
            sales_options)
    }


    FormHistoryList()
    {
        let history_cols = [
            new ListCol("Обращение", "name"),
            new ListCol("Услуга", "name", true),
            new ListCol("Ресурс", "type", true),
            new ListCol("Дата", "pmin", true),
            new ListCol("Статус", "pmin", true)
        ]

        let showId = true

        let history_rows = []

        let records = this.currentClient.ClientRecords

        for(let i = 0; i < records.length; i++)
        {
            let val = ""

            if(records[i].status == "1")
            {
                val = "<span class='status-column status-column_closed'><img src='assets/images/Lock.svg' class='status-img'> Закрыто</span>"
            }
            else if (records[i].status == "0")
            {
                val = "<span class='status-column status-column_open'><img src='assets/images/Green_dot.svg' class='status-img'> Открыто</span>"
            }

            history_rows.push(new ListRow([
                records[i].record,
                records[i].Product.name,
                Formatter.GetShortName(records[i].Resource.name),
                Formatter.FormatDate(records[i].date),
                val,
            ]))
        }

        let history_options = new ListOptions(showId, true)

        this.history_list = new ListData(
            history_cols,
            history_rows, 
            "history",
            "",
            history_options
        )
    }
    
}
