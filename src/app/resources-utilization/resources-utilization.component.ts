import { ApplicationRef, Component, OnInit } from '@angular/core';
import { Tab, TabsData } from '../tabs/tabs.component';
import { Resource } from '../resource'
import * as restservice from '../rest.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { PopupElement } from '../popup-element';
import { ListData, ListCol, ListRow, ListButton, ListOptions } from '../list/list.component';
import { first } from 'rxjs/operators';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ResourceFormComponent } from '../resource-form/resource-form.component';
import { Formatter } from '../formatter';
import { ProfileData } from '../profile/profile.component';
import { DropdownItem, DropdownList } from '../dropdown/dropdown.component';
import { TimeData } from '../time-table/time-table.component';

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
    log_list:ListData

    profile_data:ProfileData
    offices:restservice.IOffice[] = []
    dropdowns:DropdownList[] = []
    timedata:TimeData

    selected_misc:number = 0
    selected_contact:number = 0
    selected_resource:number = 0
    
    loaded:boolean = false

    SwitchResource = (index:number) =>
    {
        this.currentResource = this.resources[index]
        this.FormServicesList()
        this.FormLogList()
        this.FormSalesList()
        this.FormProfile()
        this.FormTime()
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
        this.getOffices()
        this.getResources()

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
            this.loaded = true
        })
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

    FormLists()
    {
        this.FormResourcesList()

        this.FormServicesList()

        this.FormSalesList()

        this.FormLogList()
    }

    FormTime()
    {
        this.timedata = new TimeData("resource", this.currentResource.Booking)
    }

    FormProfile()
    {
        this.profile_data = new ProfileData(null, this.currentResource)

        let offices_list = []
        let selected = -1

        for(let i = 0; i < this.offices.length; i++)
        {
            offices_list.push(new DropdownItem(this.offices[i].name, this.offices[i].id))
            if(this.offices[i].id == this.currentResource.Office.id)
            {
                selected = i
            }
            
        }

        let selected_type = 0

        if(this.currentResource.ResourceType.id == "2")
        {
            selected_type = 1
        }

        let status_selected = 1

        if(this.currentResource.status)
        {
            status_selected = 0
        }

        this.dropdowns = [
            new DropdownList("sign", "Признак", [
                new DropdownItem("Родительский", "1"),
                new DropdownItem("Дочерний", "2"),
            ], selected_type),
            new DropdownList("status", "Статус", [
                new DropdownItem("Активен", "1"),
                new DropdownItem("Не доступен", "2"),
            ], status_selected),
        ]
    }

    FormSalesList()
    {
        let cols = [
            new ListCol("Услуга", "name"),
            new ListCol("Ресурс", "type", true),
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
            if(String(booking[i].BookingStatus) == "2") 
            {

                let dt = Formatter.FormatDateTime(booking[i].datetime)

                rows.push(new ListRow([
                    booking[i].Product.name,
                    booking[i].Client.name,
                    booking[i].actualprice,
                    dt
                ]))
            }
        }

        let sales_options = new ListOptions(showId, true)

        this.sales_list = new ListData(cols, rows, "sales", "", sales_options)
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
            new ListCol("Утилизация", "type", true)
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


    FormLogList()
    {
        let log_cols = [
            new ListCol("Действие", "koef"),
            new ListCol("Поле", "koef"),
            new ListCol("Новое значение", "type"),
            new ListCol("Дата и время", "pmin"),
            new ListCol("Пользователь", "pmax"),
        ]

        let log_rows = []

        let log = this.currentResource.ResourceLog

        for(let i = 0; i < log.length; i++)
        {
            log_rows.push(new ListRow([
                log[i].action,
                log[i].field,
                log[i].value,
                Formatter.FormatDateTime(log[i].datetime),
                log[i].User.name
            ]))
        }

        let log_options = new ListOptions(true, true)

        this.log_list = new ListData(log_cols, log_rows, "log", "", log_options)


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
	
}
