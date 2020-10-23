import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-context',
    inputs: ['obj', 'name', 'top', 'left', 'visibility', 'type', 'callback'],
    templateUrl: './context.component.html',
    styleUrls: ['./context.component.css']
})
export class ContextComponent implements OnInit 
{
    name:any
    top:number
    left:number
    visibility:string
    obj:any
    
    
    callback:(obj:any, data:any) => void

    type:string

    constructor() { }

    ngOnInit(): void 
    {
    }

    Hide()
    {
        this.obj.context_visibility = " _hidden"
    }

    ButtonClick(value:string)
    {
        let data = value
        this.callback(this.obj, data)
    }
}
