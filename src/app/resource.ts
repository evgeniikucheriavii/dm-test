import { DropdownItem, DropdownList } from './dropdown/dropdown.component'
import { Formatter } from './formatter'
import { IResource, ICompany, IContact, IContactType, IMisc, IOffice, IProduct, IResourceType, IRate, IBooking } from "./rest.service"

export class Resource implements IResource
{
    id:string
    name:string
    birthdate:string
    ageString:string
    sex:string
    sexString:string
    Misc:IMisc[]
    Offices:IOffice[]
    Contacts:IContact[]
    Products:IProduct[]
    ResourceType:IResourceType
    Company:ICompany
    Rates:IRate[]
    Booking:IBooking[]
    AvailableHours:string
    LastMonthHours:string
    AvgHourRate:string
    status:boolean

    typeList:DropdownList
    signList:DropdownList
    officeList:DropdownList
    statusList:DropdownList

    shortname:string;
	type:string;
	util:string;
    color:string;
    
    available:number;
    spent:number;
    avg:string;
    lastmonth:string
    availability:string

    koef:string
    price_max:string
    price_min:string
    income_goal:string
    income_max:string
    income_min:string
    sale:string

    services = [];
    contacts = [];
    transactions = [];
    specials = [];

	constructor(res:IResource)
	{
        this.id = res.id
        this.name = res.name
        this.shortname = ""
        this.ResourceType = res.ResourceType
        this.sex = res.sex
        this.birthdate = res.birthdate
        this.Misc = res.Misc
        this.Offices = res.Offices
        this.Contacts = res.Contacts
        this.Products = res.Products
        this.Company = res.Company
        this.Rates = res.Rates
        this.Booking = res.Booking
        this.AvailableHours = res.availability
        this.LastMonthHours = res.lastmonth
        this.AvgHourRate = res.avg
        this.util = res.util
        this.status = res.status
        this.sale = res.sale

        this.koef = res.koef
        this.price_max = res.price_max
        this.price_min = res.price_min
        this.income_goal = res.income_goal
        this.income_max = res.income_max
        this.income_min = res.income_min

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

        let bdt = Date.parse(this.birthdate)
        let nd = new Date(Date.now())
        let dt = new Date(bdt)

        let timeDiff = Math.abs(nd.getTime() - dt.getTime())
        let yearsDiff = Math.ceil(timeDiff / (1000 * 3600 * 24 * 365))

        let yearsStr = "" + yearsDiff

        if(yearsStr.endsWith("11") || yearsStr.endsWith("12") || yearsStr.endsWith("13") || yearsStr.endsWith("14"))
        {
            this.ageString = yearsDiff + " лет"
        }
        else if(yearsStr.endsWith("1")) 
        {
            this.ageString = yearsDiff + " год"
        }
        else if(yearsStr.endsWith("2") || yearsStr.endsWith("3") || yearsStr.endsWith("4"))
        {
            this.ageString = yearsDiff + " года"
        }
        else 
        {
            this.ageString = yearsDiff + " лет"
        }

        if(this.sex != "-1")
        {
            this.shortname = Formatter.GetShortName(this.name)
            
        }
        else
        {
            this.shortname = this.name
        }
        
        this.typeList = new DropdownList("type", "Тип", [
            new DropdownItem("Трудовой", "3"),
            new DropdownItem("Оборудование", "2")
        ], 0)

        this.signList = new DropdownList("sign", "Признак", [
            new DropdownItem("Родительский", "1"),
            new DropdownItem("Дочерний", "2"),
        ], 0)

        this.officeList = new DropdownList("office", "Офис", [
            new DropdownItem("Офис 1", "1"),
            new DropdownItem("Офис 2", "2")
        ], 0)

        this.statusList = new DropdownList("status", "Статус", [
            new DropdownItem("Активен", "1"),
            new DropdownItem("Пассивен", "2"),
        ], 0)

		let num_util = Number(this.util);

		if(num_util <= 10)
		{
			this.color = "red";
		}
		else if(num_util > 10 && num_util < 16)
		{
			this.color = "brown";
		}
		else if(num_util > 16 && num_util < 30)
		{
			this.color = "lgreen";
		}
		else if(num_util >= 30 && num_util < 40)
		{
			this.color = "green";
		}
		else 
		{
			this.color = "bgreen";
		}
	}
}
