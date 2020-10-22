import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-context',
    inputs: ['name'],
    templateUrl: './context.component.html',
    styleUrls: ['./context.component.css']
})
export class ContextComponent implements OnInit 
{
    name:any

    constructor() { }

    ngOnInit(): void 
    {
    }

}
