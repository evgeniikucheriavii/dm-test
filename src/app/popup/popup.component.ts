import { Component, OnInit } from '@angular/core';
import { PopupElement } from '../popup-element';

@Component({
  selector: 'app-popup',
  inputs: ['popup'],
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit 
{
    popup:PopupElement
    visible:string

    constructor() { }

    ngOnInit(): void 
    {
        this.visible = "_hidden"
        console.log(this.popup)
    }

}
