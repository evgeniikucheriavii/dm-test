import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from 'protractor';
import { ListCol } from '../list-col';
import { ListData } from '../list-data';
import { ListRow } from '../list-row';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    inputs: ['listdata', 'callback'],
    styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit 
{

    listdata:ListData
    callback: (args:any) => void

    constructor() 
    { 
        
    }

    ngOnInit(): void 
    {
        
    }

    ItemClick(index:number)
    {
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

}
