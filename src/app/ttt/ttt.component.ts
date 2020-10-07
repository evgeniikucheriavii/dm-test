import { Component, OnInit } from '@angular/core';
import { IResource, RestService } from '../rest.service';
import { Resource } from "../resource"

@Component({
  selector: 'app-ttt',
  templateUrl: './ttt.component.html',
  styleUrls: ['./ttt.component.css']
})
export class TttComponent implements OnInit {

    resources:Resource = []

    constructor(public rest:RestService) { }

    ngOnInit(): void 
    {
        this.getResources()
    }

    getResources()
    {
        this.rest.getResources().subscribe((rest:any) => {
            this.resources = rest
            console.log(this.resources)
        })
    }

}
