import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';


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


export interface IContact
{
    id:string
    Contact:string
    ContactType:IContactType
}


export interface IMisc
{
    id:string
    value:string
    datetime:string
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

const endpoint = 'http://localhost:8000/api/v1/';


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
