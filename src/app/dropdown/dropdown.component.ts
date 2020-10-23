import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { element } from 'protractor';

@Component({
    selector: 'app-dropdown',
    inputs: ['list', 'callback', 'name', 'obj'],
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit 
{
    fg:FormGroup = new FormGroup({})

    obj:any

    name:string
    list:DropdownList
    callback:(obj:any, value:any) => void

    constructor() { }

    ngOnInit(): void 
    {
        this.fg.addControl("list_" + this.name, new FormControl(''))
        this.list.CheckByIndex(this.list.selected)
    }

    ngAfterContentInit(): void
    {
        
    }

    OnChange(value:string)
    {
        // console.log(this.fg)
        if(this.callback != null)
        {
            this.callback(this.obj, this.fg.get("list_" + this.name).value)
        }
        this.list.Check(value)
    }

}

export class DropdownList 
{
    title:string
    name:string
    items:DropdownItem[] = []
    selected:number
    none_checked:boolean = true

    constructor(name:string, title:string, items:DropdownItem[], seleted:number = -1)
    {
        this.name = name
        this.items = items
        this.title = title + ""
        this.selected = this.selected
    }

    Check(value:string)
    {
        for(let i = 0; i < this.items.length; i++)
        {
            this.items[i].Uncheck()

            if(this.items[i].value == value)
            {
                this.items[i].Check()
                this.selected = i
            }  
        }

        if(this.selected == -1)
        {
            this.none_checked = true
        }
        else
        {
            this.none_checked = true
        }

    }

    CheckByIndex(index:number)
    {
        this.selected = index
        for(let i = 0; i < this.items.length; i++)
        {
            this.items[i].Uncheck()

            if(index == i)
                this.items[i].Check()
        }

        if(this.selected == -1)
        {
            this.none_checked = true
        }
        else
        {
            this.none_checked = false
        }
    }
}

export class DropdownItem 
{
    title:string
    value:string
    checked:boolean = false

    constructor(title:string, value:string)
    {
        this.title = title
        this.value = value
    }

    Check()
    {
        this.checked = true
    }

    Uncheck()
    {
        this.checked = false
    }
}
