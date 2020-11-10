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
import { Resource } from '../resource';
import { Calendar } from '../calendar/calendar.component';
import { observable } from 'rxjs';

@Component({
	selector: 'app-company-schedule',
	templateUrl: './company-schedule.component.html',
	styleUrls: ['./company-schedule.component.css']
})
export class CompanyScheduleComponent implements OnInit 
{

    calendar:Calendar;
    
    timedata:TimeData
    booking:restservice.IBooking[] = []
    resources:Resource[] = []
    company_schedules:restservice.ICompanySchedule[] = []
    
    SelectDate = (obj:any, date:number, month:number, year:number) => 
    {
        this.calendar.FormCalendar()
        this.timedata.date = new Date(year, month - 1, date)
        this.timedata.Form()
        // alert(this.timedata.date)
    }

	constructor(public rest:restservice.RestService, private cookieService:CookieService, private router:Router, private appRef:ApplicationRef) { }

	ngOnInit(): void 
	{
        this.getCompanySchedule()
        this.calendar = new Calendar(26, 10, 2020)
        
    }
    
    getCompanySchedule()
    {
        this.rest.getCompanySchedule().subscribe((rest:any) => {

            for(let i = 0; i < rest.length; i++)
            {
                this.company_schedules.push(rest[i])
            }

            this.FormTime()
            this.appRef.tick()
        })
    }

    FormTime()
    {
        this.timedata = new TimeData("schedule", [], this.company_schedules, this.calendar.selected_date)
    }
    
}