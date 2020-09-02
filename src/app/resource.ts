export class Resource
{
    name:string;
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

	constructor(name:string, type:string, util:number)
	{
        this.name = name;
        this.fullname = "Колесов Александр Иванович";
		this.type = type;
		this.util = util;

        this.avg = 1350;
        this.spent = 650;
        this.available = 245;

		if(util <= 10)
		{
			this.color = "red";
		}
		else if(util > 10 && util < 16)
		{
			this.color = "brown";
		}
		else if(util > 16 && util < 30)
		{
			this.color = "lgreen";
		}
		else if(util >= 30 && util < 40)
		{
			this.color = "green";
		}
		else 
		{
			this.color = "bgreen";
		}
	}
}
