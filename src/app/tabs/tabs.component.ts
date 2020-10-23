import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-tabs',
    inputs: ["tabsdata", "callback", "obj"],
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit 
{
    callback:(index:number) => void
    tabsdata:TabsData
    obj:any

    constructor() { }

    ngOnInit(): void 
    {
        // this.TabClick(0)
    }

    public TabClick(index:number)
    {
        this.callback(index)

        this.tabsdata.Activate(index)
    }

}

export class TabsData
{
    tabs:Tab[]
    name:string
    defaultTab:number = 0
    currentTab:number = 0

    constructor(name:string, tabs:Tab[])
    {
        this.tabs = tabs
        this.name = name

        this.tabs[this.currentTab].Activate();
    }

    public Activate(index:number)
    {
        if(index <= this.tabs.length)
		{
			this.currentTab = index;

			for(let i = 0; i < this.tabs.length; i++)
			{
				this.tabs[i].Deactivate();
			}

			this.tabs[this.currentTab].Activate();
		}
    }
}

export class Tab 
{
	id:string;
	name:string;
	classes:string;
	active:boolean = false;

	static Classname:string = "tab";
	static ClassnameActive:string = "tab_active";

	constructor(id:string, name:string)
	{
		this.id = id;
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
