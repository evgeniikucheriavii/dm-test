import { ApplicationRef, Component, OnInit } from '@angular/core';
import { DropdownItem, DropdownList, DropdownOptions } from '../dropdown/dropdown.component';
import { Formatter } from '../formatter';
import { Resource } from '../resource';
import { IBooking, IClient, ICompanySchedule, IOffice, IProduct, IResource } from '../rest.service';
import { ResourceSchedule } from '../schedule/schedule.component';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-schedule-menu',
    inputs: [
        'callback', 
        'current_schedule', 
        'current_datetime', 
        'cur_dt', 
        'close_callback', 
        'open_callback', 
        'delete_callback', 
        'edit_callback', 
        'save_callback',
        'additional_data'
    ],
    templateUrl: './schedule-menu.component.html',
    styleUrls: ['./schedule-menu.component.css']
})
export class ScheduleMenuComponent implements OnInit 
{
    schedule_form:FormGroup = new FormGroup({
        status: new FormControl(''),
        channel: new FormControl(''),
        util: new FormControl(''),
        msg: new FormControl(''),
        date: new FormControl(''),
        duration: new FormControl('')
    })

    Close = () =>
    {
        if(this.additional_data != null)
        {
            let close = confirm("Вы уверены, что хотите отменить заполнение формы?")

            if(!close)
            {
                return
            }
        }

        this.current_schedule = null
        this.additional_data = null
        this.current_datetime = ""
        this.cur_dt = ""

        if(this.close_callback != null)
        {
            this.close_callback(this, "")
        }
    }

    Open = () =>
    {

    }

    Save = () =>
    {
        let data = {
            status: this.schedule_form.get("status").value,
            channel: this.schedule_form.get("channel").value,
            duration: this.schedule_form.get("duration").value,
            datetime: this.schedule_form.get("date").value,
            util: this.schedule_form.get("util").value,
            msg: this.schedule_form.get("msg").value,
            resource: this.selected_resource,
            client: this.selected_client,
            office: this.selected_office,
            type: this.selected_type,
            product: this.selected_product
        }

        let keys = Object.keys(data)
        let valid = true

        for(let i = 0; i < keys.length; i++)
        {
            if(data[keys[i]] == null || data[keys[i]] == "" || data[keys[i]] == "-1")
            {
                valid = false
                alert(keys[i])
                break
            }
        }

        if(!valid)
        {
            alert("Проверьте заполнение данных")
            return
        }

        if(this.save_callback != null)
        {
            this.save_callback(this, data)
        }


        // this.close_callback(this, "")   


    }

    Show = () =>
    {

    }

    Delete = () =>
    {

    }

    Edit = () =>
    {

    }

    Clear = () =>
    {

    }

    SelectResource = (obj:any, value:any) =>
    {
        this.selected_resource = value
    }

    SelectClient = (obj:any, value:any) =>
    {
        this.selected_client = value
    }

    SelectOffice = (obj:any, value:any) =>
    {
        this.selected_office = value
    }

    SelectProduct = (obj:any, value:any) =>
    {
        this.selected_product = value
    }

    SelectType = (obj:any, value:any) =>
    {
        this.selected_type = value

        // alert(value)

        if(this.selected_type == "1")
        {
            this.utilName = "Правило утилизации"
            this.utilPlaceholder = "Правило"
        }
        else
        {
            this.utilName = "Подтверждение"
            this.utilPlaceholder = "Подтверждение"
        }
    }

    callback:(obj:any, value:any) => void
    close_callback:(obj:any, value:any) => void
    open_callback:(obj:any, value:any) => void
    save_callback:(obj:any, value:any) => void

    current_schedule:ICompanySchedule = null
    current_datetime:string = ""
    cur_dt:string = ""
    additional_data:any = null

    resources_dropdown:DropdownList = null
    clients_dropdown:DropdownList = null
    offices_dropdown:DropdownList = null
    products_dropdown:DropdownList = null
    types_dropdown:DropdownList = null

    selected_resource:string = ""
    selected_client:string = ""
    selected_product:string = ""
    selected_office:string = ""
    selected_type:string = ""

    utilName:string = "Правило утилизации"
    utilPlaceholder = "Правило"

    form_ready:boolean = false

    resources_ready:boolean = false
    clients_ready:boolean = false
    offices_ready:boolean = false
    types_ready:boolean = false
    products_ready:boolean = false

    constructor(private appRef:ApplicationRef) { }

    ngOnInit(): void 
    {
        this.FormDropdowns()

    }

    FormDropdowns()
    {
        if(this.additional_data != null)
        {
            this.FormResourcesDropdowns()
            this.FormOfficesDropdowns()
            this.FormClientsDropdowns()
            this.FormProductsDropdowns()
            this.FormTypesDropdowns()
        }
        
    }

    FormResourcesDropdowns()
    {
        this.resources_dropdown = null

        let items = [
            new DropdownItem("Ресурс", "-1")
        ]

        let resources:IResource[] = this.additional_data.resources

        for(let i = 0; i < resources.length; i++)
        {
            items.push(new DropdownItem(
                Formatter.GetShortName(resources[i].name), 
                resources[i].id))
        }

        let options = new DropdownOptions(false, false)

        this.resources_dropdown = new DropdownList(
            "resources",
            "",
            items,
            0,
            options
        )

        this.resources_ready = true

        this.CheckLoading()
    }

    FormOfficesDropdowns()
    {
        this.offices_dropdown = null

        let items = [
            new DropdownItem("Офис", "-1")
        ]

        let offices:IOffice[] = this.additional_data.offices

        for(let i = 0; i < offices.length; i++)
        {
            items.push(new DropdownItem(
                offices[i].name, 
                offices[i].id))
        }

        let options = new DropdownOptions(false, false)

        this.offices_dropdown = new DropdownList(
            "offices",
            "",
            items,
            0,
            options
        )

        this.offices_ready = true

        this.CheckLoading()
    }

    FormClientsDropdowns()
    {
        this.clients_dropdown = null

        let items = [
            new DropdownItem("Клиент", "-1")
        ]

        let clients:IClient[] = this.additional_data.clients

        for(let i = 0; i < clients.length; i++)
        {
            items.push(new DropdownItem(
                Formatter.GetShortName(clients[i].name), 
                clients[i].id))
        }

        let options = new DropdownOptions(false, false)

        this.clients_dropdown = new DropdownList(
            "clients",
            "",
            items,
            0,
            options
        )

        this.clients_ready = true   

        this.CheckLoading()
    }

    FormProductsDropdowns()
    {
        this.products_dropdown = null

        let items = [
            new DropdownItem("Услуга", "-1")
        ]

        let products:IProduct[] = this.additional_data.products

        for(let i = 0; i < products.length; i++)
        {
            items.push(new DropdownItem(
                products[i].name, 
                products[i].id))
        }

        let options = new DropdownOptions(false, false)

        this.products_dropdown = new DropdownList(
            "products",
            "",
            items,
            0,
            options
        )

        this.products_ready = true

        this.CheckLoading()
    }

    FormTypesDropdowns()
    {
        this.types_dropdown = null

        let items = [
            new DropdownItem("Тип", "-1"),
            new DropdownItem("Промоакция", "1"),
            new DropdownItem("Услуга", "2"),
            new DropdownItem("Зарезервировано", "3"),
            new DropdownItem("Акция не сработала", "4"),
        ]

        let options = new DropdownOptions(false, false)

        this.types_dropdown = new DropdownList(
            "types",
            "",
            items,
            0,
            options
        )

        this.types_ready = true

        this.CheckLoading()
    }

    CheckLoading()
    {
        if(this.resources_ready
            && this.offices_ready
            && this.clients_ready
            && this.products_ready
            && this.types_ready
        )
        {
            this.form_ready = true
        }
    }

}
