export class Tab 
{
	name:string;
	classes:string;
	active:boolean = false;

	static Classname:string = "tab";
	static ClassnameActive:string = "tab_active";

	constructor(name:string)
	{
		this.name = name;

		this.classes = Tab.Classname;
	}

	Activate()
	{
		this.active = true;
		
		this.classes = Tab.Classname + " " + Tab.ClassnameActive;
	}

	Deactivate()
	{
		this.active = false;
		this.classes = Tab.Classname;
	}
}
