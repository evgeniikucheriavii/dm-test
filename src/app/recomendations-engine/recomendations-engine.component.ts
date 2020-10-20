import { ApplicationRef, Component, OnInit } from '@angular/core';
import { Tab } from '../tab';
import * as restservice from '../rest.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { UtilizationRule } from '../utilization-rule';
import { UtilizationCat } from '../utilization-cat';
import { ListData, ListCol, ListRow } from '../list/list.component';

@Component({
	selector: 'app-recomendations-engine',
	templateUrl: './recomendations-engine.component.html',
	styleUrls: ['./recomendations-engine.component.css']
})
export class RecomendationsEngineComponent implements OnInit 
{
	tabs = [];
	currentTab:number;

	utilizationCats:UtilizationCat[] = [];
    currentCat:UtilizationCat;
    
    cats_list:ListData
    rules_list:ListData

	searchLog = [];

    data = [];
    
    SwitchCat = (index:number) =>
    {
        this.currentCat = this.utilizationCats[index]
        this.appRef.tick()

        this.FormRulesList()
    }

	constructor(public rest:restservice.RestService, private cookieService:CookieService, private router:Router, private appRef:ApplicationRef) { }

    ngOnInit(): void 
	{
		this.tabs = [
			new Tab("rules", "Правила экстренной утилизации"),
			new Tab("actions", "Action Center")
		];

		this.currentTab = 0;

        this.tabs[this.currentTab].Activate();
        
        this.getUtilizationCats()


		this.searchLog = [
			new SearchLog(11, "12.06 14.03", "Иванов Иван", 0),
			new SearchLog(10, "12.06 14.03", "Иванов Иван", 1),
			new SearchLog(9, "12.06 14.03", "Иванов Иван", 2),
			new SearchLog(8, "12.06 14.03", "Иванов Иван", 0),
			new SearchLog(7, "12.06 14.03", "Иванов Иван", 1),
			new SearchLog(6, "12.06 14.03", "Иванов Иван", 2),
			new SearchLog(5, "12.06 14.03", "Иванов Иван", 0),
			new SearchLog(4, "12.06 14.03", "Иванов Иван", 1),
			new SearchLog(3, "12.06 14.03", "Иванов Иван", 2),
			new SearchLog(2, "12.06 14.03", "Иванов Иван", 0),
			new SearchLog(1, "12.06 14.03", "Иванов Иван", 1)
		];

		this.data = [
			new Resource("Иванов Иван", "Массаж 45 минут", "13.06.2020 13:00 - 14:00", 5, 0),
			new Resource("Иванов Иван", "Массаж 45 минут", "13.06.2020 13:00 - 14:00", 13, 0),
			new Resource("Иванов Иван", "Массаж 45 минут", "13.06.2020 13:00 - 14:00", 5, 0),
			new Resource("Иванов Иван", "Массаж 45 минут", "13.06.2020 13:00 - 14:00", 2, 0),
			new Resource("Иванов Иван", "Массаж 45 минут", "13.06.2020 13:00 - 14:00", 4, 0),
			new Resource("Иванов Иван", "Массаж 45 минут", "13.06.2020 13:00 - 14:00", 5, 1),
			new Resource("Иванов Иван", "Массаж 45 минут", "13.06.2020 13:00 - 14:00", 15, 0),
			new Resource("Иванов Иван", "Массаж 45 минут", "13.06.2020 13:00 - 14:00", 32, 1),
			new Resource("Иванов Иван", "Массаж 45 минут", "13.06.2020 13:00 - 14:00", 2, 0),
			new Resource("Иванов Иван", "Массаж 45 минут", "13.06.2020 13:00 - 14:00", 7, 1),
			new Resource("Иванов Иван", "Массаж 45 минут", "13.06.2020 13:00 - 14:00", 2, -1),
			new Resource("Иванов Иван", "Массаж 45 минут", "13.06.2020 13:00 - 14:00", 5, -1),
			new Resource("Иванов Иван", "Массаж 45 минут", "13.06.2020 13:00 - 14:00", 5, -1),
			new Resource("Иванов Иван", "Массаж 45 минут", "13.06.2020 13:00 - 14:00", 5, 1),
			new Resource("Иванов Иван", "Массаж 45 минут", "13.06.2020 13:00 - 14:00", 5, 1),
			new Resource("Иванов Иван", "Массаж 45 минут", "13.06.2020 13:00 - 14:00", 5, 1),
			new Resource("Иванов Иван", "Массаж 45 минут", "13.06.2020 13:00 - 14:00", 5, 1),
			new Resource("Иванов Иван", "Массаж 45 минут", "13.06.2020 13:00 - 14:00", 5, 1),
			new Resource("Иванов Иван", "Массаж 45 минут", "13.06.2020 13:00 - 14:00", 5, 1),
		];
	}

    getUtilizationCats()
    {
        this.rest.getUtilizationCatsWithRules("1").subscribe((rest:any) => { 
            for(let i = 0; i < rest.length; i++)
            {
                this.utilizationCats.push(new UtilizationCat(rest[i]))
                // this.getUtilizationRules(this.utilizationCats[i])
            }

            this.currentCat = this.utilizationCats[0]
            this.appRef.tick()
            this.FormLists()
            this.SwitchCat(0)
            
        })
    }

    getUtilizationRules(cat:UtilizationCat)
    {
        this.rest.getUtilizationRule(cat.id).subscribe((rest:any) => {
            for(let i = 0; i < rest.length; i++)
            {
                cat.addRule(rest[i])
            }

        })
    }

    FormLists()
    {
        this.FormCatsList()
        this.FormRulesList()
    }

    public FormCatsList()
    {
        let cat_rows = []

        for(let i = 0; i < this.utilizationCats.length; i++)
        {
            cat_rows.push(new ListRow([this.utilizationCats[i].str, this.utilizationCats[i].discount]))
        }

        this.cats_list = new ListData(
            [
                new ListCol("Название раздела", "name"),
                new ListCol("Скидка в %", "type"),
            ],
            cat_rows,
            "cats",
            "",
            true,
            "list__head_lined"
        )
    }

    public FormRulesList()
    {
        let rules_rows = []

        let rules = this.currentCat.rules

        for(let i = 0; i < rules.length; i++)
        {
            rules_rows.push(new ListRow([rules[i].str, rules[i].discount]))
        }

        this.rules_list = new ListData(
            [
                new ListCol("Ресурсы и % загрузки от целевых значений", "name"),
                new ListCol("Скидка %", "type"),
            ],
            rules_rows,
            "rules",
            "",
            true,
            "list__head_lined"
        )
    }

	public SwitchTab(index:number)
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

	public PriorityClick()
	{
		let priority = document.getElementById("priority");

		if(priority.className == "priority")
		{
			priority.className = "priority priority_active";
		}
		else
		{
			priority.className = "priority";
		}
	}
}

class SearchLog
{
	id:number;
	date:string;
	client:string;
	status:number;

	constructor(id:number, date:string, client:string, status:number)
	{
		this.id = id;
		this.date = date;
		this.client = client;
		this.status = status;
	}
}

class Resource
{
	name:string;
	service:string;
	interval:string;
	vote:number;
	status:number;

	constructor(name:string, service:string, interval:string, vote:number, status:number)
	{
		this.name = name;
		this.service = service;
		this.interval = interval;
		this.vote = vote;
		this.status = status;
	}
}