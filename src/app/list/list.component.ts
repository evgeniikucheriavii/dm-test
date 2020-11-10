import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from 'protractor';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'reverse' })
export class ReversePipe implements PipeTransform 
{
    transform(value) 
    {
        return value.slice().reverse();
    }
}


@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    inputs: ['listdata', 'callback', 'dots_callback', 'button_callback', 'obj', "height"],
    styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit 
{
    obj:any
    listdata:ListData
    callback: (index:number) => void
    dots_callback: (obj:any, index:number) => void
    button_callback: (obj:any, index:number) => void
    height:string

    have_dots:boolean = false
    have_button:boolean = false

    constructor() 
    { 
        
    }

    ngOnInit(): void 
    {
        if(typeof(this.dots_callback) == "function") 
            this.have_dots = true
        
        if(typeof(this.button_callback) == "function") 
            this.have_button = true

        
        setTimeout(this.SetHeight, 100)
        
    }

    SetHeight()
    {
        // let list_body = document.getElementById("list__body_" + this.listdata.listname)

        // console.log(this.listdata)
    }

    ItemClick(index:number)
    {
        if(typeof(this.callback) != "function")
            return

        let rows = document.getElementsByClassName("list-row_" + this.listdata.listname)
        for(let i = 0; i < this.listdata.rows.length; i++)
        {
            rows[i].className = "list-row list-row_" + this.listdata.listname

            if(i == index)
            {
                rows[i].className += " list-row_active"
            }
        }
        if(this.callback != null)
        {
            this.callback(index)
        }
        
    }

    ClickDots(e, index:number)
    {
        if(e.pageX < window.innerWidth - 250)
            this.obj.context_left = e.pageX + 20
        else
            this.obj.context_left = e.pageX - 250
        
        if(e.pageY < window.innerHeight - 250)
            this.obj.context_top = e.pageY
        else
        this.obj.context_top = e.pageY - 250
        this.obj.context_type = "misc"
        this.dots_callback(this.obj, index)
    }

    ClickButton(index:number)
    {
        this.button_callback(this.obj, index)
    }

}


export class ListData 
{
    title:string
    showTitle:boolean = true
    showId:boolean = true
    rows:ListRow[]
    cols:ListCol[]
    titleclasses:string = ""
    listname:string = ""
    options:ListOptions

    constructor(cols:ListCol[], rows:ListRow[], listname:string, title:string = "", options:ListOptions = new ListOptions())
    {
        this.rows = rows
        this.cols = cols
        this.title = title
        this.listname = listname
        this.options = options

        if(title == "")
        {
            this.options.showTitle = false
        }

        if(this.options.lined)
        {
            this.titleclasses = "list__head_lined"
        }
    }
    
}

export class ListOptions
{
    lined:boolean = false
    reversed:boolean = false
    showId:boolean = true
    showTitle:boolean = false
    hideHead:boolean = false

    constructor(
        showId:boolean = true, 
        lined:boolean = false, 
        reversed:boolean = false, 
        hideHead:boolean = false)
    {
        this.showId = showId
        this.lined = lined
        this.reversed = reversed
        this.hideHead = hideHead
    }
}


export class ListRow 
{
    values:any[]
    isTitle:boolean = false

    constructor(values:any[], isTitle:boolean = false)
    {
        this.values = values
        this.isTitle = isTitle
    }
}

export class ListCol 
{
    name:string
    type:string
    sortable:boolean

    static types:string[] = [
        "name",
        "num"
    ]

    constructor(name:string, type:string, sortable:boolean = false)
    {
        this.name = name
        this.type = type
        this.sortable = sortable
    }

}

export class ListButton
{
    type:string = "button"
    text:string
    icon:string

    constructor(text:string, icon:string)
    {
        this.text = text
        this.icon = icon
    }
}