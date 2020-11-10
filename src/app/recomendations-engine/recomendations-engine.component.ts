import { ApplicationRef, Component, OnInit } from '@angular/core';
import { Tab, TabsData } from '../tabs/tabs.component';
import * as restservice from '../rest.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { UtilizationRule } from '../utilization-rule';
import { UtilizationCat } from '../utilization-cat';
import { ListData, ListCol, ListRow, ListOptions } from '../list/list.component';
import { IPromo } from '../rest.service';
import { Formatter } from '../formatter';

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
    
    cats_list:ListData = new ListData([], [], "")
    rules_list:ListData = new ListData([], [], "")
    promos_list:ListData = new ListData([], [], "")
    proposals_list:ListData = new ListData([], [], "")

    promos:IPromo[] = []
    currentPromo:IPromo

    newPrice:string = ""
    formattedDate = ""
    promoStatus:string = ""

    
    SwitchCat = (index:number) =>
    {
        this.currentCat = this.utilizationCats[index]
        this.appRef.tick()

        this.FormRulesList()
    }

    SwitchTab = (index:number) =>
    {

    }

    SwitchPromo = (index:number) =>
    {
        this.currentPromo = this.promos[index]
        this.FormPromosList()
        this.FormProposalsList()

        this.newPrice = String(Number(this.currentPromo.Product.price) / 100 * Number(this.currentPromo.discount))
        this.formattedDate = Formatter.FormatDate(this.currentPromo.date)
        
        let status = Number(this.currentPromo.status)
        let val = ""

        if(status == 0)
        {
            val = "<img src='assets/images/Green_dot.svg' class='status-img status-img_active'> завершен"
        }
        else if(status == 1)
        {
            val = "<img src='assets/images/Yellow_dots.svg' class='status-img status-img_active'> активен"
        }
        else if(status == -1)
        {
            val = "<img src='assets/images/Red_dot.svg' class='status-img status-img_active'> не удачно"
        }

        this.promoStatus = val


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
        this.getPromos()
        this.getUtilizationCats()
	}

    getUtilizationCats()
    {
        this.rest.getUtilizationCats().subscribe((rest:any) => { 
            for(let i = 0; i < rest.length; i++)
            {
                this.utilizationCats.push(new UtilizationCat(rest[i]))
            }

            this.currentCat = this.utilizationCats[0]
            this.appRef.tick()
            this.FormCatsList()
            this.FormRulesList()
            this.SwitchCat(0)
            
        })
    }

    getPromos()
    {
        this.rest.getPromos().subscribe((rest:any) => { 
            for(let i = 0; i < rest.length; i++)
            {
                this.promos.push(rest[i])
            }

            this.currentPromo = this.promos[0]
            this.appRef.tick()
            this.SwitchPromo(0)
            
        })
    }

    FormLists()
    {
        this.FormCatsList()
        this.FormRulesList()
        this.FormPromosList()
        this.FormProposalsList()
    }

    FormPromosList()
    {
        let cols = [
            new ListCol("Ресурс", "pmin2"),
            new ListCol("Услуга", "service"),
            new ListCol("Временный интервал", "koef3"),
            new ListCol("Отправлено", "koef3"),
            new ListCol("Статус", "koef2"),
        ]

        let rows = []

        for(let i = 0; i < this.promos.length; i++)
        {

            let val = ""

            let status = Number(this.promos[i].status)

            if(status == 0)
            {
                val = "<div class='status_done'><img src='assets/images/Green_dot.svg' class='status-img status-img_active'> завершен</div>"
            }
            else if(status == 1)
            {
                val = "<div class='status_active'><img src='assets/images/Yellow_dots.svg' class='status-img status-img_active'> активен</div>"
            }
            else if(status == -1)
            {
                val = "<div class='status_fail'><img src='assets/images/Red_dot.svg' class='status-img status-img_active'> не удачно</div>"
            }

            rows.push(new ListRow([
                Formatter.GetShortName(this.promos[i].Resource.name),
                this.promos[i].Product.name,
                Formatter.FormatDate(this.promos[i].date) + " " + this.promos[i].interval,
                this.promos[i].Proposals.length,
                val
            ]))
        }

        let options = new ListOptions(true, true)

        this.promos_list = new ListData(cols, rows, "actions", "", options)
    }

    FormProposalsList()
    {
        let proposals = this.currentPromo.Proposals

        let cols = [
            new ListCol("Дата / Время", "type"),
            new ListCol("Клиент", "name"),
            new ListCol("Статус", "type"),
        ]

        let rows = []

        for(let i = 0; i < proposals.length; i++)
        {
            let val = ""

            let status = Number(proposals[i].status)

            if(status == 1)
            {
                val = "<img src='assets/images/Approve.svg'> Забронировано"
            } 
            else if(status == 0)
            {
                val = "<img src='assets/images/Eye.svg'> Не прочитано"
            }
            else if(status == -1)
            {
                val = "<img src='assets/images/Cross.svg'> Удалено"
            }
            else if(status == 2)
            {
                val = "<img src='assets/images/Eye_green.svg'> Прочитано"
            }

            let dt = Formatter.FormatDateTime(proposals[i].datetime)

            rows.push(new ListRow([
                dt, 
                proposals[i].Client.name, 
                val
            ]))
        }

        let options = new ListOptions(true, true, true) 

        this.proposals_list = new ListData(
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
