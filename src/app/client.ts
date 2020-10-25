import { IBooking, IClient, ICompany, IContact, IMisc, IOffice } from './rest.service';

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

    shortname:string
    sexString:string

    sale:boolean = false;
    rfm:string
    ltv:string

    ltvString:string;

    fio:string;

    log = [];
    contacts = [];
    transactions = [];
    services = [];

    specials = [];
    
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

        this.rfm = client.rfm
        this.ltv = client.ltv

        let ltvNum = Number(this.ltv)

        this.ltvString = this.Format(ltvNum)

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

        let w = this.name.split(" ")
            
        if(w.length > 1)
        {
            w[1] = w[1][0] + "."
            this.shortname = w[0] + " " + w[1]

            if(w.length > 2)
            {
                w[2] = w[2][0] + "."
                this.shortname += " " + w[2]
            }
        }
        else 
        {
            this.shortname = this.name
        }
    }

    private Format(value:number)
    {
        let nfObject = new Intl.NumberFormat('ru-RU');
        let output = nfObject.format(value);

        return output; 
    }

}
