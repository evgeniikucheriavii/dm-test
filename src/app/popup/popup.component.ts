import { Component, OnInit } from '@angular/core';
import { PopupElement } from '../popup-element';

@Component({
  selector: 'app-popup',
  inputs: ['popup', 'name', 'height', 'obj', 'callback', 'visible', 'index', 'type'],
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit 
{
    index:any
    popup:PopupElement
    visible:string = "_hidden"
    name:string
    height:string
    obj:any
    type:any
    callback:(args:any) => void

    constructor() { }

    ngOnInit(): void 
    {
        this.visible = "_hidden"
        console.log(this.popup)
    }

    Hide(e)
    {
        if(e.target.id == "popup")
            this.obj.popupVisibility = "_hidden"
    }


    

}
