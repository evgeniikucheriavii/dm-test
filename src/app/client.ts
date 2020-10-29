import { Formatter } from './formatter';
import { IBooking, IClient, IClientRecord, ICompany, IContact, IMisc, IOffice } from './rest.service';

export class Client implements IClient
{
    id: string;
    name: string;
    birthdate: string;
    sex: string;
    Misc: IMisc[];
    Offices: IOffice[];
    Contacts: IContact[];
    Company: ICompany;
    Booking:IBooking[]
    ClientRecords:IClientRecord[]
    contactpolicy:string
    cx:string
    promo:boolean

    shortname:string
    sexString:string

    sale:boolean = false;
    rfm:string
    ltv:string

    ltvString:string;

    fio:string;
    
    constructor(client:IClient)
    {
        this.id = client.id
        this.name = client.name
        this.birthdate = client.birthdate
        this.sex = client.sex
        this.Misc = client.Misc
        this.Offices = client.Offices
        this.Contacts = client.Contacts
        this.Booking = client.Booking
        this.ClientRecords = client.ClientRecords
        this.contactpolicy = client.contactpolicy
        this.cx = client.cx
        this.promo = client.promo

        this.rfm = client.rfm
        this.ltv = client.ltv

        let ltvNum = Number(this.ltv)

        this.ltvString = Formatter.FormatMoney(ltvNum)

        if(this.sex == "1") 
        {
            this.sexString = "Муж"
        } 
        else if(this.sex == "0")
        {
            this.sexString = "Жен"
        }
        else
        {
            this.sexString = "Обр"
        }

        this.shortname = Formatter.GetShortName(this.name)
    }
}
