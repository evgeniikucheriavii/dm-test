import { Component, OnInit } from '@angular/core';
import { Formatter } from '../formatter';
import { Resource } from '../resource';
import { IBooking, ICompanySchedule, IResource } from '../rest.service';
import { ResourceSchedule } from '../schedule/schedule.component';

@Component({
    selector: 'app-time-table',
    inputs: ['timedata', 'width'],
    templateUrl: './time-table.component.html',
    styleUrls: ['./time-table.component.css']
})
export class TimeTableComponent implements OnInit 
{
    width:number

    timedata:TimeData
    schedule_menu_class:string = "_hidden"
    schedule_overlay_class:string = "_hidden"
    current_schedule:ICompanySchedule = null
    current_datetime:string = ""
    cur_dt:string = ""

    constructor() { }

    ngOnInit(): void 
    {
       
    }


    TaskClick(task:any)
    {
        if(this.timedata.showInfo)
        {
            this.schedule_menu_class = ""
            this.schedule_overlay_class = ""

            for(let i = 0; i < this.timedata.company_schedules.length; i++)
            {
                if(task.id == this.timedata.company_schedules[i].id)
                {
                    this.current_schedule = this.timedata.company_schedules[i]
                    this.current_datetime = Formatter.FormatDate(this.current_schedule.datetime)
                    
                    this.cur_dt = this.current_datetime + " " + Formatter.FormatTime(this.timedata.company_schedules[i].datetime)
                    break
                }
            }
        }
        
    }

    CloseMenu()
    {
        this.schedule_menu_class = "_hidden"
        this.schedule_overlay_class = "_hidden"
        this.current_schedule = null
        this.current_datetime = ""
        this.cur_dt = ""
    }

    IsCurrentHour(hour:number)
	{
		if(this.timedata.currentHour == hour)
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
		if(this.timedata.currentHour > hour)
		{
			return "_past-hour";
		} 
		else if(this.timedata.currentHour == hour)
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


export class TimeData
{
    time = []
    currentHour:number
    hours = []
    data:IBooking[] = []
    type:string = ""
    dates:DateGraph[] = []
    schedule:Day[] = []
    company_schedules:ICompanySchedule[] = []
    date:Date = new Date()
    res:ResData[] = []
    showInfo:boolean = false

    constructor(type:string, data:IBooking[], company_schedules:ICompanySchedule[] = null, date:Date = null)
    {
        this.type = type
        this.data = data
        this.date = date

        if(this.type == "schedule")
        {
            this.showInfo = true
        }

        if(this.date == null)
        {
            let today = new Date()
            let h = String(today.getHours())
            let m = String(today.getMinutes())

            if(today.getHours() < 10)
            {
                h = "0" + h
            }

            if(today.getMinutes() < 0)
            {
                m = "0" + m
            }

            let ds = "2020-10-26T" + h + ":" + m + ":59+03:00"
            // alert(ds)
            this.date = new Date(ds) 
            // alert(this.date)
        }

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
        
        this.company_schedules = company_schedules

        this.Form()
    }

    Form()
    {

        let d = this.date

        this.currentHour = d.getHours()

		this.hours = [ 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21 ];

        this.schedule = []
        this.dates = []
        this.res = []

        if(this.type == "schedule")
        {
            for(let i = 0; i < this.company_schedules.length; i++)
            {
                let got = false
                for(let j = 0; j < this.res.length; j++)
                {
                    if(this.company_schedules[i].Resource.id == this.res[j].Resource.id)
                    {
                        this.res[j].company_schedules.push(this.company_schedules[i])
                        got = true
                        break
                    }
                }

                if(!got)
                {
                    this.res.push(new ResData(this.company_schedules[i].Resource, [this.company_schedules[i]]))
                }
            }

            for(let i = 0; i < this.res.length; i++)
            {
                let shortname = Formatter.GetShortName(this.res[i].Resource.name)
                this.dates.push(new DateGraph(shortname, 0))
                let s = []

                let cs:ICompanySchedule[] = this.res[i].Get(d.getDate(), d.getMonth(), d.getFullYear())

                for(let h = 0; h < this.time.length; h++)
                {
                    let tasks:Task[] = []

                    for(let j = 0; j < cs.length; j++)
                    {
                        let csd = new Date(cs[j].datetime)

                        if(csd.getHours() == this.time[h].hour)
                        {
                            tasks.push(new Task(
                                cs[j].Product.name,
                                csd.getMinutes(),
                                Number(cs[j].duration),
                                Number(cs[j].event_type),
                                cs[j].id
                                ))
                        }
                    }

                    s.push(new Schedule(this.time[h].hour, tasks))
                    // alert(s.length)
                    
                }
                // alert(s)

                this.schedule.push(new Day(shortname, s))

            }
        }
        else
        {
            for(let i = 0; i < 7; i++)
            {
                let dd = new Date(d)
                dd.setDate(dd.getDate() + i)
                // alert(d)

                let dString = String(dd.getDate()) + "." + (dd.getMonth() + 1)
                // alert(dString)

                if(dd.getDate() == d.getDate() && dd.getMonth() == d.getMonth())
                {
                    dString = "<b>" + dString + "</b>"
                }
                
                this.dates.push(new DateGraph(dString, 0))

                let schedules = []
                for(let h = 0; h < this.time.length; h++)
                {
                    let tasks = []
                    for(let j = 0; j < this.data.length; j++)
                    {
                        let nd = new Date(this.data[j].datetime)

                        if(nd.getDate() == dd.getDate() && nd.getMonth() == dd.getMonth() && nd.getFullYear() == dd.getFullYear())
                        {
                            if(nd.getHours() == this.time[h].hour) 
                            {
                                tasks.push(new Task(
                                    this.data[j].Product.name, 
                                    nd.getMinutes(),
                                    Number(this.data[j].actualduration),
                                    2
                                    ))
                            }
                        }
                    }

                    schedules.push(new Schedule(this.time[h].hour, tasks))
                }

                let day = new Day(dString, schedules)
                

                this.schedule.push(day)
            }
        }
    }
}

class ResData
{
    Resource:IResource
    company_schedules:ICompanySchedule[] = []

    constructor(resource:IResource, company_schedules:ICompanySchedule[])
    {
        this.Resource = resource
        this.company_schedules = company_schedules
    }

    Get(date:number, month:number, year:number)
    {
        let schedules:ICompanySchedule[] = []

        for(let i = 0; i < this.company_schedules.length; i++)
        {
            let wd = new Date(this.company_schedules[i].datetime)

            if(wd.getFullYear() == year
                && wd.getMonth() == month
                && wd.getDate() == date)
            {
                schedules.push(this.company_schedules[i])
            }
        }

        return schedules
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
    shortname:string

	type:number;
	typeClass:string;

    sizeClass:string;
    id:string

	constructor(name:string, start:number, duration:number, type:number, id:string = "-1")
	{
        this.id = id
		this.name = name;
		this.start = start;
		this.duration = duration;
        this.type = type;
        
        let len = 0

		switch(this.type)
		{
			case 1: this.typeClass = "legend_promo"; break;
			case 2: this.typeClass = "legend_service"; break;
			case 3: this.typeClass = "legend_reserve"; break;
			case 4: this.typeClass = "legend_fail"; break;
		}

		if(this.duration >= 15 && this.duration < 30)
		{
            this.sizeClass = "task_small";
            len = 5
		}
		else if(this.duration >= 30 && this.duration < 45)
		{
            this.sizeClass = "task_medium";
            len = 10
		}
		else if(this.duration >= 45 && this.duration < 60)
		{
            this.sizeClass = "task_large";
            len = 15
		}
		else
		{
            this.sizeClass = "task_huge";
            len = 25
        }
        
        this.shortname = this.name.slice(0, len) + "..."
	}

	Classes()
	{
		return this.typeClass + " " + this.sizeClass; 
	}
}
