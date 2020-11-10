import { Component, OnInit } from '@angular/core';
import { Client } from '../client';
import { DropdownItem, DropdownList } from '../dropdown/dropdown.component';
import { Formatter } from '../formatter';
import { ListButton, ListCol, ListData, ListOptions, ListRow } from '../list/list.component';
import { Resource } from '../resource';
import { IContact, IMisc } from '../rest.service';

@Component({
    selector: 'app-profile',
    inputs: [
        'profile_data', 
        'type', 
        'dropdowns',
        'contacts_callback',
        'misc_callback',
        'obj',
    ],
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit 
{

    profile_data:ProfileData
    dropdowns:DropdownList[]
    type:string

    ContactsContext = () =>
    {

    }

    Communicate = () =>
    {
        
    }

    MiscContext = () =>
    {

    }

    constructor() { }

    ngOnInit(): void 
    {
    }

}

export class ProfileData
{
    sex:string = ""
    age:string = ""
    banner_items:BannerItem[] = []

    dropdowns:DropdownList[] = []

    contacts_list:ListData
    misc_list:ListData

    Resource:Resource = null
    Client:Client = null

    type:string = ""

    constructor(Client:Client = null, Resource:Resource = null)
    {
        this.Resource = Resource
        this.Client = Client

        if(this.Resource != null)
        {
            this.type = "resource"
            this.sex = this.Resource.sexString
            this.age = this.Resource.ageString
        }
        else if(this.Client != null)
        {
            this.type = "client"
            this.sex = this.Client.sexString
            this.age = this.Client.ageString
        }
        else
        {
            this.type = "none"
        }

        this.FormMiscList()
        this.FormContactsList()
        this.FormBannerItems()
    }

    FormBannerItems()
    {
        if(this.type == "client")
        {
            let promo = ""

            if(this.Client.promo)
            {
                promo = "Да"
            }
            else
            {
                promo = "Нет"
            }

            this.banner_items = [
                new BannerItem("RFM:",Formatter.FormatMoney(Number(this.Client.rfm)) ),
                new BannerItem("LTV:", Formatter.FormatMoney(Number(this.Client.ltv))),
                new BannerItem("Участник акции: ", promo),
                new BannerItem("Контактная политика: ", this.Client.contactpolicy),
                new BannerItem("Цикл CX: ", this.Client.cx),
            ]
        }
        else if(this.type == "resource")
        {
            this.banner_items = [
                new BannerItem("Доступность ресурса в текущем месяце", this.Resource.AvailableHours + " часов"),
                new BannerItem("Потрачено времени на оказание услуг в прошлом месяце", this.Resource.LastMonthHours + " часов"),
                new BannerItem("Средневзвешенная стоимость человекочаса", this.Resource.AvgHourRate + " ₽"),
            ]
        }
        
    }

    FormMiscList()
    {
        let misc_cols = [
            new ListCol("Особенность", "name"),
            new ListCol("Добавлено", "type")
        ]
        
        let misc_rows = []

        let misc:IMisc[] = []

        if(this.type == "resource")
        {
            misc = this.Resource.Misc
        }
        else if(this.type == "client")
        {
            misc = this.Client.Misc
        }
        else
        {
            return
        }

        for(let i = 0; i < misc.length; i++)
        {
            let dt = Formatter.FormatDate(misc[i].date)
            misc_rows.push(new ListRow([misc[i].value, dt]))
        }

        let misc_options = new ListOptions(true, true)
        
        this.misc_list = new ListData(misc_cols, misc_rows, "misc", "Особенности", misc_options)
    }

    FormContactsList()
    {
        let contacts_cols = [
            new ListCol("Канал", "name"),
            new ListCol("Номер \ Ник", "type", true),
            new ListCol("Последняя коммуникация", "name", true),
            new ListCol("Действие", "util", true),
        ]

        let contacts_rows = []

        let contacts:IContact[] = []

        if(this.type == "resource")
        {
            contacts = this.Resource.Contacts
        }
        else if (this.type == "client")
        {
            contacts = this.Client.Contacts
        }
        else
        {
            return
        }

        for(let i = 0; i < contacts.length; i++)
        {
            let comm = "никогда"

            if(Number(contacts[i].LastCommunication.id) > 0)
            {
                comm = Formatter.FormatDateTime(contacts[i].LastCommunication.datetime) + ""
            }
            
            let btn = null

            if(contacts[i].ContactType.action == "phone")
            {
                btn = new ListButton("Позвонить", "Call")
            }
            else
            {
                btn = new ListButton("Написать", "Write")
            }

            contacts_rows.push(new ListRow([
                contacts[i].ContactType.name,
                contacts[i].Contact,
                comm,
                btn
            ]))
        }

        let contacts_options = new ListOptions(true, true)

        this.contacts_list = new ListData(contacts_cols, contacts_rows, "contacts", "Контакты", contacts_options)
    }
}

export class BannerItem
{
    header:string = ""
    body:string = ""

    constructor(header:string, body:string)
    {
        this.header = header
        this.body = body
    }
}
