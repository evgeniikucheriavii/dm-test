import { Component, OnInit } from '@angular/core';
import * as restservice from '../rest.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { DropdownComponent, DropdownItem, DropdownList } from '../dropdown/dropdown.component';

@Component({
    selector: 'app-misc-form',
    inputs: ['obj', 'index', 'callback', 'type'],
    templateUrl: './misc-form.component.html',
    styleUrls: ['./misc-form.component.css']
})
export class MiscFormComponent implements OnInit 
{
    misc_form:FormGroup = new FormGroup({
        name: new FormControl('')
    })

    type:any
    obj:any
    msg:string
    index:any = ""

    callback:(obj:any, args:any) => void

    constructor(public rest:restservice.RestService, private cookieService:CookieService, private router:Router) { }

    ngOnInit(): void 
    {
    }

    OnSubmit()
    {
        let misc = {
            resource: this.index, 
            client: -1,
            value: this.misc_form.get("name").value
        }

        this.rest.createMisc(misc).subscribe((rest:any) => {
            if(rest.status == 1)
            {
                this.msg = "Особенность добавлена"
                this.callback(this.obj, this.index)
            }
            else
            {
                this.msg = "Что-то пошло не так!"
            }
        })
    }

}
