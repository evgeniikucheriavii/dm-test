import { Component, OnInit } from '@angular/core';
import * as restservice from '../rest.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { exception } from 'console';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit 
{
    msg:string
    loged:boolean

    constructor(public rest:restservice.RestService, private cookieService:CookieService, private router:Router) { }

    ngOnInit(): void 
    {
        this.loged = false

        if(this.cookieService.get("token"))
        {
            this.loged = true
        }
    }

    login(login:string, password:string)
    {
        try {
            let result = false
            this.rest.login(login, password).subscribe((rest:any) => {
                if(rest)
                {
                    console.log(rest)
                    if(rest.token)
                    {
                        this.cookieService.set("token", rest.token)
                        this.cookieService.set("tokenDate", rest.tokenDate)
                        this.cookieService.set("id", rest.id)
                        result = true
                        document.location.reload()
                    }
                    else
                    {
                        this.msg = "Ошибка авторизации!"
                    }
                }
                else
                {
                    this.msg = "Ошибка авторизации!"
                }
            })

            if(!result)
            {
                
            }
            
        } catch (e) {
            this.msg = "Ошибка авторизации!"
        }
        
    }

    validateLogin(token:string)
    {
        
    }

    handleLogin(login, password)
    {
        this.login(login, password)
        return false
    }

}
