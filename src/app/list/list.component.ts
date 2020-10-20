import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from 'protractor';

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

    ClickDots(index:number)
    {
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
    titleclasses:string
    listname:string = ""

    constructor(cols:ListCol[], rows:ListRow[], listname:string, title:string = "", showId:boolean = true, titleclasses:string = "")
    {
        this.rows = rows
        this.cols = cols
        this.title = title
        this.showId = showId
        this.titleclasses = titleclasses
        this.listname = listname

        if(title == "")
        {
            this.showTitle = false
        }
    }
    
}



export class ListRow 
{
    values:string[]
    isTitle:boolean = false

    constructor(values:string[], isTitle:boolean = false)
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