import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-calendar',
    inputs: ['calendar', 'obj', 'callback'],
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit 
{
    calendar:Calendar
    obj:any
    callback:(obj:any, date:number, month:number, year:number) => void

    constructor() { }

    ngOnInit(): void 
    {

    }

    SelectDay(week:number, day:number)
    {
        let d = this.calendar.weeks[week].days[day]
        this.callback(this.obj, d.date, d.month, d.year)
        this.calendar.SelectDate(d.date, d.month, d.year)
    }

    NextMonth()
    {
        this.calendar.NextMonth()
    }

    PrevMonth()
    {
        this.calendar.PrevMonth()
    }

}


export class Calendar
{
    date:number
    year:number
    month:number
    month_index:number

    months:string[] = [ "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь" ]
    monthsdays:number[] = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ]

    weeks:Week[] = []

    current_date:Date
    selected_date:Date

    constructor(date:number, month:number, year:number)
    {
        this.date = date
        this.month = month
        this.month_index = month - 1
        this.year = year

        this.current_date = new Date()
        this.selected_date = new Date(year, this.month_index, date)

        this.FormCalendar()
    }

    NextMonth()
    {   
        this.month_index++

        if(this.month_index > 11)
        {
            this.month_index = 0
            this.year++
        }

        this.month = this.month_index + 1

        this.FormCalendar()
    }

    PrevMonth()
    {
        this.month_index--

        if(this.month_index < 0)
        {
            this.month_index = 11
            this.year--
        }

        this.month = this.month_index + 1

        this.FormCalendar()
    }

    SelectDate(date:number, month:number, year:number)
    {
        this.selected_date = new Date(year, month - 1, date)
        this.FormCalendar()
    }


    FormCalendar()
    {
        this.weeks = []
        let d = new Date(this.year, this.month_index, 1)
        let weekNumber = 0

        let monthLength = this.monthsdays[this.month_index]

        if(this.month == 2)
        {
            if(this.year % 4 == 0 && this.year % 400 == 0 && this.year % 100 == 0)
            {
                monthLength = 29
            }
        }
        

        let days = []
        
        let first_day_offset = d.getDay()

        for(let i = 0; i < first_day_offset; i++)
        {
            days.push(new WeekDay(0, 0, 0, true))
        }
        
        for(let i = 1; i <= monthLength; i++)
        {
            let wd = new WeekDay(i, this.month, this.year)

            if(wd.date == this.current_date.getDate()
                && wd.month == this.current_date.getMonth() + 1
                && wd.year == this.current_date.getFullYear())
            {
                wd.classes += " calendar__day_current"
            }

            if(wd.date == this.selected_date.getDate()
                && wd.month == this.selected_date.getMonth() + 1
                && wd.year == this.selected_date.getFullYear())
            {
                wd.classes += " calendar__day_selected"
            }

            days.push(wd)

            let dd = new Date(this.year, this.month_index, i)

            if(dd.getDay() == 6 || i == monthLength)
            {
                weekNumber++
                this.weeks.push(new Week(days))
                days = []
            }
        }

        let lastday = this.weeks[weekNumber - 1].days[this.weeks[weekNumber - 1].days.length - 1]

        let lastday_offset = new Date(lastday.year, lastday.month - 1, lastday.date).getDay()

        for(let i = 6; i > lastday_offset; i--)
        {
            this.weeks[weekNumber - 1].days.push(new WeekDay(0, 0, 0, true))
        }
    }
}

export class Week
{
    days:WeekDay[] = []

    constructor(days:WeekDay[])
    {
        this.days = days
    }
}

export class WeekDay
{
    date:number
    dateStr:string = ""
    month:number
    year:number
    classes:string = ""

    constructor(date:number, month:number, year:number, empty:boolean = false)
    {
        this.date = date
        this.month = month
        this.year = year

        this.dateStr = this.date + ""
        if(empty)
        {
            this.dateStr = ""
        }

        let d = new Date(this.year, this.month - 1, this.date)

        if(d.getDay() >=5)
        {
            this.classes = "calendar__day_weekend"
        }
    }

}