import { DropdownItem } from './dropdown-item'
import { DropdownList } from './dropdown-list'
import { IResource, ICompany, IContact, IContactType, IMisc, IOffice, IProduct, IResourceType } from "./rest.service"

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

    typeList:DropdownList
    signList:DropdownList
    officeList:DropdownList
    statusList:DropdownList

    shortname:string;
	type:string;
	util:number;
    color:string;
    
    available:number;
    spent:number;
    avg:number;

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
        else
        {
            this.shortname = this.name
        }
        
        this.typeList = new DropdownList("type", "Тип", [
            new DropdownItem("Трудовой", "1"),
            new DropdownItem("Оборудование", "2")
        ])

        this.signList = new DropdownList("sign", "Признак", [
            new DropdownItem("Родительский", "1"),
            new DropdownItem("Дочерний", "2"),
        ])

        this.officeList = new DropdownList("office", "Офис", [
            new DropdownItem("Офис 1", "1"),
            new DropdownItem("Офис 2", "2")
        ])

        this.statusList = new DropdownList("status", "Статус", [
            new DropdownItem("Активен", "1"),
            new DropdownItem("Пассивен", "2"),
        ])

		this.util = 10;

        this.avg = 1350;
        this.spent = 650;
        this.available = 245;

		if(this.util <= 10)
		{
			this.color = "red";
		}
		else if(this.util > 10 && this.util < 16)
		{
			this.color = "brown";
		}
		else if(this.util > 16 && this.util < 30)
		{
			this.color = "lgreen";
		}
		else if(this.util >= 30 && this.util < 40)
		{
			this.color = "green";
		}
		else 
		{
			this.color = "bgreen";
		}
	}
}
