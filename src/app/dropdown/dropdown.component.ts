import { TokenizeResult } from '@angular/compiler/src/ml_parser/lexer';
import { ApplicationRef, Component, OnInit } from '@angular/core';
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

    bg_hidden:string = "_hidden"
    items_hidden:string = "_hidden-items"
    image_classes:string = "_blue"
    image_path:string = "Down.png"

    callback:(obj:any, value:any) => void = null

    constructor(private appRef:ApplicationRef) { }

    ngOnInit(): void 
    {
        this.fg.addControl("list_" + this.name, new FormControl(''))
        
    }

    ngAfterContentInit(): void
    {
        this.Select(this.list.selected)
    }

    OnChange(value:string)
    {
        // console.log(this.fg)
        if(this.callback != null)
        {
            this.callback(this.obj, this.fg.get("list_" + this.name).value)
        }
    }

    Close()
    {
        this.bg_hidden = "_hidden"
        this.items_hidden = "_hidden-items"
        // this.image_classes = "_blue"
        // this.image_path = "Down.png"
    }

    Open()
    {
        this.bg_hidden = ""
        this.items_hidden = ""
        // this.image_classes = "_white"
        // this.image_path = "Up.png"
        // alert("Open")
    }

    Select(index:number)
    {
        this.list.selected_title = this.list.items[index].title
        this.list.selected = index

        if(this.callback != null)
        {
            this.callback(this.obj, this.list.items[index].value)
        }
        
        this.Close()
    }

}

export class DropdownList 
{
    title:string
    name:string
    items:DropdownItem[] = []
    selected:number
    selected_title:string = ""
    none_checked:boolean = true
    options:DropdownOptions = null
    classes:string = ""

    constructor(
        name:string, 
        title:string, 
        items:DropdownItem[], 
        selected:number = -1, 
        options:DropdownOptions = new DropdownOptions())
    {
        this.name = name
        this.items = items
        this.title = title + ""
        this.selected_title = title + ""
        this.selected = selected
        this.options = options

        if(this.options.fullSize)
        {
            this.classes += " dropdown_fullsize"
        }
    }
}

export class DropdownOptions
{
    showTitle:boolean = false
    fullSize:boolean = false

    constructor(
        showTitle:boolean = true,
        fullSize:boolean = false
        )
    {
        this.showTitle = showTitle
        this.fullSize = fullSize
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
}
