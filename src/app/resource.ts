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

    fullname:string;
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
        this.fullname = "Колесов Александр Иванович"
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

        let dt = Date.parse(this.birthdate)
        let nd = new Date(Date.now())
        dt = new Date(dt)

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
