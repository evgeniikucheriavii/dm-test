export class Contact
{
	type:number;
	name:string;
	value:string;
	lastdate:string;
	typeString:string;

	constructor(type:number, name:string, value:string, lastdate:string)
	{
		this.type = type;
		this.name = name;
		this.value = value;
		this.lastdate = lastdate;

		if(this.type == 0)
		{
			this.typeString = "Телефон";
		}
		else
		{
			this.typeString = "Почта";
		}
	}
}