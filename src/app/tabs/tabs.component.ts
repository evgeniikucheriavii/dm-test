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

    TabClick(index:number)
    {
        this.callback(index)

        if(index <= this.tabsdata.tabs.length)
		{
			this.tabsdata.currentTab = index;

			for(let i = 0; i < this.tabsdata.tabs.length; i++)
			{
				this.tabsdata.tabs[i].Deactivate();
			}

			this.tabsdata.tabs[this.tabsdata.currentTab].Activate();
		}
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
