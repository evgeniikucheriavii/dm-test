import { ApplicationRef, Component, OnInit } from '@angular/core';
import { Tab, TabsData } from '../tabs/tabs.component';
import * as restservice from '../rest.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { UtilizationRule } from '../utilization-rule';
import { UtilizationCat } from '../utilization-cat';
import { ListData, ListCol, ListRow, ListOptions } from '../list/list.component';

@Component({
	selector: 'app-recomendations-engine',
	templateUrl: './recomendations-engine.component.html',
	styleUrls: ['./recomendations-engine.component.css']
})
export class RecomendationsEngineComponent implements OnInit 
{
	tabsdata:TabsData

	utilizationCats:UtilizationCat[] = [];
    currentCat:UtilizationCat;
    
    cats_list:ListData
    rules_list:ListData
    action_list:ListData
    search_list:ListData

	searchLog = [];

    data = [];
    
    SwitchCat = (index:number) =>
    {
        this.currentCat = this.utilizationCats[index]
        this.appRef.tick()

        this.FormRulesList()
    }

    SwitchTab = (index:number) =>
    {

    }

	constructor(public rest:restservice.RestService, private cookieService:CookieService, private router:Router, private appRef:ApplicationRef) { }

    ngOnInit(): void 
	{
		let tabs = [
			new Tab("rules", "Правила экстренной утилизации"),
			new Tab("actions", "Action Center")
		];

        this.tabsdata = new TabsData("recomendations", tabs)
        
        this.tabsdata.Activate(1)
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
        this.FormActionCenter()
        this.FormSearchList()
    }

    FormActionCenter()
    {
        let cols = [
            new ListCol("Ресурс", "type"),
            new ListCol("Услуга", "service"),
            new ListCol("Временный интервал", "service"),
            new ListCol("Отправлено", "util"),
            new ListCol("Статус", "util"),
        ]

        let rows = []

        for(let i = 0; i < this.data.length; i++)
        {

            let val = ""

            if(this.data[i].status == 0)
            {
                val = "<div class='status_done'><img src='assets/images/Green_dot.svg' class='status-img status-img_active'> завершен</div>"
            }
            else if(this.data[i].status == 1)
            {
                val = "<div class='status_active'><img src='assets/images/Yellow_dots.svg' class='status-img status-img_active'> активен</div>"
            }
            else if(this.data[i].status == -1)
            {
                val = "<div class='status_fail'><img src='assets/images/Red_dot.svg' class='status-img status-img_active'> не удачно</div>"
            }



            rows.push(new ListRow([
                this.data[i].name,
                this.data[i].service,
                this.data[i].interval,
                this.data[i].vote,
                val
            ]))
        }

        let options = new ListOptions(true, true)

        this.action_list = new ListData(cols, rows, "actions", "", options)
    }

    FormSearchList()
    {
        let cols = [
            new ListCol("Дата / Время", "type"),
            new ListCol("Клиент", "name"),
            new ListCol("Статус", "type"),
        ]

        let rows = []

        for(let i = 0; i < this.searchLog.length; i++)
        {
            let val = ""

            if(this.searchLog[i].status == 0)
            {
                val = "<img src='assets/images/Approve.svg'> Забронировала"
            } 
            else if(this.searchLog[i].status == 1)
            {
                val = "<img src='assets/images/Eye.svg'> Не прочитал"
            }
            else if(this.searchLog[i].status == 2)
            {
                val = "<img src='assets/images/Cross.svg'> Удалил"
            }

            rows.push(new ListRow([this.searchLog[i].date, this.searchLog[i].client, val]))
        }

        let options = new ListOptions(true, true, true) 

        this.search_list = new ListData(
            cols, 
            rows,
            "search",
            "",
            options
        )
    }

    public FormCatsList()
    {
        let cat_rows = []

        for(let i = 0; i < this.utilizationCats.length; i++)
        {
            cat_rows.push(new ListRow([this.utilizationCats[i].str, this.utilizationCats[i].discount]))
        }

        let cat_options = new ListOptions(true, true)

        this.cats_list = new ListData(
            [
                new ListCol("Название раздела", "name"),
                new ListCol("Скидка в %", "type"),
            ],
            cat_rows,
            "cats",
            "",
            cat_options
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

        let rules_options = new ListOptions(true, true)

        this.rules_list = new ListData(
            [
                new ListCol("Ресурсы и % загрузки от целевых значений", "name"),
                new ListCol("Скидка %", "type"),
            ],
            rules_rows,
            "rules",
            "",
            rules_options
        )
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