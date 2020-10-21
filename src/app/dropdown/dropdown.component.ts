import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DropdownList } from '../dropdown-list';

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
    }

    ngAfterContentInit(): void
    {
        
    }

    OnChange(value:number)
    {
        // console.log(this.fg)
        this.callback(this.obj, this.fg.get("list_" + this.name).value)
    }

}
