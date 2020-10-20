import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { UtilizationCat } from './utilization-cat';


export interface IOffice
{
    id:string
    name:string
    address:string
    Company:ICompany
}


export interface ICompany
{
    id:string
    name:string
}


export interface IContactType
{
    id:string
    name:string
    action:string
}


export interface ICommunicationLog
{
    id:string
    datetime:string
    User:IUser
}


export interface IContact
{
    id:string
    Contact:string
    ContactType:IContactType
    LastCommunication:ICommunicationLog
}


export interface IMisc
{
    id:string
    value:string
    date:string
}


export interface IProduct
{
    id:string
    name:string
    Company:string
    ResourceType:IResourceType
    duration:string
}


export interface IResourceType
{
    id:string
    name:string
}


export interface IResource
{
    id:string
    name:string
    birthdate:string
    sex:string
    Misc:IMisc[]
    Offices:IOffice[]
    Contacts:IContact[]
    Products:IProduct[]
    ResourceType:IResourceType
    Company:ICompany
}


export interface IClient
{
    id:string
    name:string
    birthdate:string
    sex:string
    Misc:IMisc[]
    Offices:IOffice[]
    Contacts:IContact[]
    Company:ICompany
}


export interface IUtilizationCat
{
    id:string
    day:string
    discount:string
    Company:ICompany
    Rules:IUtilizationRule[]
}


export interface IUtilizationRule
{
    id:string
    percent_from:string
    percent_to:string
    is_up:boolean
    discount:string
}


export interface IUser
{
    id:string
    name:string
}


export interface ILogin
{
    login:string
    password:string
}


const endpoint = 'http://localhost:50084/api/v1/';


@Injectable({
  providedIn: 'root'
})
export class RestService 
{

    constructor(private http: HttpClient) { }



    private extractData(res: Response): any 
    {
        const body = res;
        return body || { };
    }


    getResources(): Observable<any> 
    {
        return this.http.get<IResource>(endpoint + 'resources/').pipe(
          catchError(this.handleError)
        );
    }

    updateResource(res:IResource)
    {
        return this.http.put<IResource>("", res).pipe(
            catchError(this.handleError)
        )
    }

    getCompanyByUserId(uid:string)
    {
        return this.http.get<ICompany>(endpoint + 'company_by_user/' + uid + '/').pipe(
            catchError(this.handleError)
        )
    }


    getResourceTypes()
    {
        return this.http.get<IResourceType>(endpoint + 'resource_types/').pipe(
            catchError(this.handleError)
        )
    }


    getOfficesByCompanyId(cid:string)
    {
        return this.http.get<IOffice>(endpoint + 'offices_by_company/' + cid + '/').pipe(
            catchError(this.handleError)
        )
    }

    getUtilizationCatsWithRules(cid:string)
    {
        return this.http.get<IUtilizationCat>(endpoint + 'utilization_cats_with_rules/' + cid + '/').pipe(
            catchError(this.handleError)
        )
    }

    getUtilizationCats(cid:string)
    {
        return this.http.get<IUtilizationCat>(endpoint + 'utilization_cat/' + cid + '/').pipe(
            catchError(this.handleError)
        )
    }


    getUtilizationRule(cid:string)
    {
        return this.http.get<IUtilizationRule>(endpoint + 'utilization_rule/' + cid + '/').pipe(
            catchError(this.handleError)
        )
    }


    getClientsByCompanyId(cid:string)
    {
        return this.http.get<IClient>(endpoint + 'clients/' + cid + '/').pipe(
            catchError(this.handleError)
        )
    }

    
    login(login:string, password:string): Observable<any>
    {
        let input:ILogin = {login: login, password: password}
        return this.http.post(endpoint + "login/?format=json", input).pipe(
            catchError(this.handleError)
        );
    }


    validateLogin(token:string, tokenDate:string, id:string)
    {
        return this.http.post(endpoint + "validate_login/?format=json", {token: token, tokenDate: tokenDate, id: id}).pipe(
            catchError(this.handleError)
        );
    }


    private handleError(error: HttpErrorResponse): any {
        if (error.error instanceof ErrorEvent) 
        {
            // console.error('An error occurred:', error.error.message);
        } 
        else 
        {
            // console.error(
            // `Backend returned code ${error.status}, ` +
            // `body was: ${error.error}`);

            
        }

        if(error.error.detail_code)
        {
            return throwError(error.error.detail_code);
        }

        return throwError(
            'Something bad happened; please try again later.');
    }
}
