import { Component, OnInit } from '@angular/core';
import { DropdownList } from '../dropdown-list';

@Component({
    selector: 'app-dropdown',
    inputs: ['list'],
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {

    list:DropdownList

    constructor() { }

    ngOnInit(): void 
    {
    }

}
