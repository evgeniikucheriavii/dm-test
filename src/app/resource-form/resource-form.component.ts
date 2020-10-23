import { Component, OnInit } from '@angular/core';
import * as restservice from '../rest.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { DropdownComponent, DropdownList, DropdownItem } from '../dropdown/dropdown.component';

@Component({
    selector: 'app-resource-form',
    inputs: ['obj', 'index', 'callback'],
    templateUrl: './resource-form.component.html',
    styleUrls: ['./resource-form.component.css']
})
export class ResourceFormComponent implements OnInit 
{
    obj:any
    index:any
    callback:(obj:any, args:any) => void

    msg:string
    edit:boolean
    company:restservice.ICompany
    ResourceTypes:restservice.IResourceType[]

    typesdown:DropdownList

    resource_form:FormGroup = new FormGroup({
        name: new FormControl(''),
        sex: new FormControl(''),
        birthdate: new FormControl('')
    })

    typeval:number = -1

    constructor(public rest:restservice.RestService, private cookieService:CookieService, private router:Router) { }

    ngOnInit(): void 
    {
        this.edit = false

        this.getCompanyByUserId()
        this.getResourceTypes()
    }

    createResource()
    {

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
            this.FormLists()
        })
    }

    FormLists()
    {
        this.FormResourceTypesList()
    }

    FormResourceTypesList()
    {
        let items = []

        for(let i = 0; i < this.ResourceTypes.length; i++)
        {
            items.push(new DropdownItem(this.ResourceTypes[i].name, this.ResourceTypes[i].id))
        }

        this.typesdown = new DropdownList("resource_type", "", items)
    }

    save()
    {

    }

    OnSubmit() 
    {
        if(this.resource_form.get("sex").value == -1)
        {
            this.typeval = 2
        }
        else
        {
            this.typeval = 1
        }

        let data:restservice.IResourceData = {
            name: this.resource_form.get("name").value,
            sex: this.resource_form.get("sex").value,
            birthdate: this.resource_form.get("birthdate").value,
            ResourceType: this.typeval + ""
        }

        this.rest.createResource(data).subscribe((rest:any) =>
        {
            console.log(rest)

            if(rest.status == 1)
            {
                "Новый ресурс добавлен!"
            }
            else
            {
                this.msg = "Что-то пошло не так!"
            }

            // this.msg = rest.message
        })
    }

}
