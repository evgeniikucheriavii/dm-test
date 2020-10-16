import { Component, OnInit } from '@angular/core';
import * as restservice from '../rest.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';


@Component({
    selector: 'app-resource-form',
    templateUrl: './resource-form.component.html',
    styleUrls: ['./resource-form.component.css']
})
export class ResourceFormComponent implements OnInit 
{

    msg:string
    edit:boolean
    company:restservice.ICompany
    ResourceTypes:restservice.IResourceType[]


    constructor(public rest:restservice.RestService, private cookieService:CookieService, private router:Router) { }

    ngOnInit(): void 
    {
        this.edit = false

        this.getCompanyByUserId()
        this.getResourceTypes()
    }

    getCompanyByUserId()
    {
        this.rest.getCompanyByUserId(this.cookieService.get("id")).subscribe((rest:any) => {
            this.company = rest;
        })
    }

    getResourceTypes()
    {
        this.rest.getResourceTypes().subscribe((rest:any) => {
            this.ResourceTypes = rest
            console.log(rest)
        })
    }

    save()
    {

    }

    handleSave(fio:string, pass:string) 
    {

    }

}
