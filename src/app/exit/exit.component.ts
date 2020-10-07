import { Component, OnInit } from '@angular/core';
import * as restservice from '../rest.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { exception } from 'console';

@Component({
    selector: 'app-exit',
    templateUrl: './exit.component.html',
    styleUrls: ['./exit.component.css']
})
export class ExitComponent implements OnInit 
{

    constructor(public rest:restservice.RestService, private cookieService:CookieService, private router:Router) { }

    ngOnInit(): void 
    {
        console.log(this.cookieService.get("token"))
        if(this.cookieService.get("token") == "" || this.cookieService.get("token") == null)
        {
            this.router.navigate(["login"])
        }
    }

    exit()
    {
        this.cookieService.deleteAll()
        document.location.reload()
    }

}
