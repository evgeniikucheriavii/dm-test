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
import { DropdownItem, DropdownList, DropdownOptions } from '../dropdown/dropdown.component';
import { TimeData } from '../time-table/time-table.component';
import { Resource } from '../resource';
import { Calendar } from '../calendar/calendar.component';
import { observable } from 'rxjs';
import { threadId } from 'worker_threads';
import { resolveTxt } from 'dns';

@Component({
	selector: 'app-company-schedule',
	templateUrl: './company-schedule.component.html',
	styleUrls: ['./company-schedule.component.css']
})
export class CompanyScheduleComponent implements OnInit 
{

    calendar:Calendar;
    typeDropdown:DropdownList = null
    resourcesDropdown:DropdownList = null
    
    timedata:TimeData
    booking:restservice.IBooking[] = []

    resources:restservice.IResource[] = []
    filtered_resources:restservice.IResource[] = []

    util:number = 0
    utilString:string = "0"
    current_resource:restservice.IResource = null

    offices:restservice.IOffice[] = []
    filtered_offices:restservice.IOffice[] = []

    company_schedules:restservice.ICompanySchedule[] = []
    filtered_schedules:restservice.ICompanySchedule[] = []

    current_schedule:restservice.ICompanySchedule = null
    current_datetime:string = ""
    cur_dt:string = ""
    additional_data:any = null
    
    clients:restservice.IClient[] = []
    products:restservice.IProduct[] = []

    loaded:boolean = false
    fully_loaded:boolean = false
    clients_loaded:boolean = false
    resources_loaded:boolean = false
    schedules_loaded:boolean = false
    products_loaded:boolean = false
    offices_loaded:boolean = false

    CloseMenu = (obj:any, value:any) =>
    {
        this.current_schedule = null
        this.current_schedule = obj.current_schedule
        this.current_datetime = ""
        this.cur_dt = ""
        this.additional_data = null
    }

    OpenMenu = (obj:any, value:any) =>
    {
        this.current_schedule = obj.current_schedule
        this.current_datetime = obj.current_datetime
        this.cur_dt = obj.cur_dt
    }

    SaveMenu = (obj:any, value:any) =>
    {

    }

    EditMenu = (obj:any, value:any) =>
    {
        
    }

    DeleteMenu = (obj:any, value:any) =>
    {

    }


    SelectType = (obj:any, value:any) =>
    {
        if(value == "0") 
        {
            this.filtered_resources = this.resources
            this.filtered_schedules = this.company_schedules
        }
        else
        {
            this.filtered_resources = this.resources.filter((r:Resource) => {
                return r.ResourceType.id == value
            })

            this.filtered_schedules = []

            for(let i = 0; i < this.company_schedules.length; i++)
            {
                let pass = false

                for(let j = 0; j < this.filtered_resources.length; j++)
                {
                    if(this.company_schedules[i].Resource.id == this.filtered_resources[j].id)
                    {
                        pass = true
                        break
                    }
                }

                if(pass)
                {
                    this.filtered_schedules.push(this.company_schedules[i])
                }
            }
        }

        this.FormResourcesDropdown()
        this.FormUtil()
        this.FormTime()
    }

    SelectResource = (obj:any, value:any) =>
    {
        if(value == "-1")
        {
            this.current_resource = null
            this.filtered_schedules = this.company_schedules
        }
        else
        {
            this.current_resource = this.resources.filter((r:restservice.IResource) =>
            {
                return r.id == value
            })[0]

            this.filtered_schedules = this.company_schedules.filter((s:restservice.ICompanySchedule) =>
            {
                return s.Resource.id == value
            })
        }
        this.FormUtil()
        this.FormTime()
    }
    
    SelectDate = (obj:any, date:number, month:number, year:number) => 
    {
        this.calendar.FormCalendar()
        this.timedata.date = new Date(year, month  - 1, date, 11, 0)
        this.timedata.Form()
        // alert(this.timedata.date)
    }

    AddTask = (obj:any, value:any) => 
    {
        this.additional_data = {
            resources: this.resources,
            clients: this.clients,
            offices: this.offices,
            products: this.products,
            value: value
        }
    }

    SaveTask = (obj:any, value:any) =>
    {
        //Validate data
        //Send request
        //Get response
        //Show result
        this.rest.createCompanySchedule(value).subscribe((rest:any) =>
        {
            if(rest["code"] == "-1")
            {
                alert("Что-то пошло не так!")
            }
            else
            {
                this.getCompanySchedule()
                this.CloseMenu(this, "")
            }
        })
    }

	constructor(public rest:restservice.RestService, private cookieService:CookieService, private router:Router, private appRef:ApplicationRef) { }

	ngOnInit(): void 
	{
        this.typeDropdown = new DropdownList("type_dropdown", "Фильтр", [
            new DropdownItem("Все", "0"),
            new DropdownItem("Трудовой", "3"),
            new DropdownItem("Оборудование", "2")
        ], 0, new DropdownOptions(false, true))

        this.calendar = new Calendar(26, 10, 2020)
        this.getCompanySchedule()
    }
    
    getCompanySchedule()
    {
        this.loaded = false
        this.offices_loaded = false
        this.products_loaded = false
        this.resources_loaded = false
        this.schedules_loaded = false
        
        this.company_schedules = []
        this.rest.getCompanySchedule().subscribe((rest:any) => {
            for(let i = 0; i < rest.length; i++)
            {
                this.company_schedules.push(rest[i])
            }

            this.filtered_schedules = this.company_schedules
            // this.ParseResources()
            this.schedules_loaded = true
            this.GetData()
            this.appRef.tick()
        })
    }

    ParseResources()
    {
        this.resources = []

        for(let i = 0; i < this.company_schedules.length; i++)
        {
            let pass = true

            for(let j = 0; j < this.resources.length; j++)
            {
                if(this.resources[j].id == this.company_schedules[i].Resource.id)
                {
                    pass = false
                    break
                }
            }

            if(pass)
            {
                this.resources.push(this.company_schedules[i].Resource)
            }
        }

        this.filtered_resources = this.resources

        this.FormResourcesDropdown()
    }

    GetData()
    {
        this.GetResources()
        this.GetClients()
        this.GetProducts()
        this.GetOffices()
    }

    CheckLoadings()
    {
        if(this.clients_loaded
            && this.products_loaded
            && this.schedules_loaded
            && this.resources_loaded
            && this.offices_loaded
            )
        {
            this.loaded = true
            this.fully_loaded = true
            this.filtered_resources = this.resources
            this.SelectDate(this, 26, 11, 2020)
            this.FormTime()
            this.FormUtil()
            this.appRef.tick()
        }
    }

    GetOffices()
    {
        this.rest.getOffices().subscribe((rest:any) =>
        {
            this.offices = []
            
            for(let i = 0; i < rest.length; i++)
            {
                this.offices.push(rest[i])
            }

            this.offices_loaded = true

            this.CheckLoadings()
        })
    }

    GetResources()
    {
        this.rest.getResources().subscribe((rest:any) => 
        {
            this.resources = []

            for(let i = 0; i < rest.length; i++)
            {
                this.resources.push(rest[i])
            }

            this.resources_loaded = true
            this.FormResourcesDropdown()
            this.CheckLoadings()
        })
    }

    GetClients()
    {
        this.rest.getClients().subscribe((rest:any) => 
        {
            this.clients = []

            for(let i = 0; i < rest.length; i++)
            {
                this.clients.push(rest[i])
            }

            this.clients_loaded = true
            this.CheckLoadings()
        })
    }

    GetProducts()
    {
        this.rest.getProducts().subscribe((rest:any) => 
        {
            this.products = []

            for(let i = 0; i < rest.length; i++)
            {
                this.products.push(rest[i])
            }

            this.products_loaded = true
            this.CheckLoadings()
        })
    }

    FormResourcesDropdown()
    {
        let items:DropdownItem[] = [
            new DropdownItem("Все", "-1")
        ]

        for(let i = 0; i < this.filtered_resources.length; i++)
        {
            items.push(new DropdownItem(
                Formatter.GetShortName(this.filtered_resources[i].name), 
                this.filtered_resources[i].id))
        }
        

        let options = new DropdownOptions(false, true)

        this.resourcesDropdown = new DropdownList(
            "resources_dropdown", 
            "Ресурсы", 
            items, 
            0, 
            options)
    }

    FormTime()
    {
        this.timedata = new TimeData("schedule", [], this.filtered_schedules, this.calendar.selected_date)
        // this.SelectDate(this, 26, 11, 2020)
    }

    FormUtil()
    {
        if(this.current_resource != null)
        {
            this.util = Number(this.current_resource.util)
        }
        else
        {
            if(this.filtered_resources.length == 0)
            {
                this.util = 0
            }
            else
            {
                let u = 0

                for(let i = 0; i < this.filtered_resources.length; i++)
                {
                    u += Number(this.filtered_resources[i].util)
                }

                u /= this.filtered_resources.length

                this.util = u
            }
        }

        this.utilString = String(this.util).substr(0, 5)
    }
}