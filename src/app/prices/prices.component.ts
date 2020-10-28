import { ApplicationRef, Component, OnInit } from '@angular/core';
import { ListData, ListCol, ListRow, ListOptions } from '../list/list.component';
import { Resource } from '../resource';
import * as restservice from '../rest.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Formatter } from '../formatter';

@Component({
	selector: 'app-prices',
	templateUrl: './prices.component.html',
	styleUrls: ['./prices.component.css']
})
export class PricesComponent implements OnInit 
{

    resources:Resource[] = [];
    prices = []
    openedDetails:number = -1;
    income_goal:number = 0
    income_max:number = 0
    income_min:number = 0

    income_goal_string:string = "0"
    income_max_string:string = "0"
    income_min_string:string = "0"
    
    prices_list:ListData
    sum_list:ListData

    constructor(public rest:restservice.RestService, private cookieService:CookieService, private router:Router, private appRef:ApplicationRef) { }

	ngOnInit(): void 
	{

        this.getResources()

		// this.data = [
		// 	new CustomData("Иванов Иван", 2000, 1000, 1, 1000, 25000, 12500, 1),
		// 	new CustomData("Сидоров Сергей", 2000, 1000, 1, 1000, 25000, 12500, 0),
		// 	new CustomData("Сидоров Сергей", 2000, 1000, 1, 1000, 25000, 12500, 1),
		// 	new CustomData("Сидоров Сергей", 2000, 1000, null, 1000, 25000, 12500, 1),
		// 	new CustomData("Сидоров Сергей", 2000, 1000, 0.83, 1000, 25000, 12500, 1),
		// 	new CustomData("Сидоров Сергей", 2000, 1000, null, 1000, 25000, 12500, 1),
		// 	new CustomData("Сидоров Сергей", 2000, 1000, 1, 1000, 25000, 12500, 1),
		// 	new CustomData("Сидоров Сергей", 2000, 1000, null, 1000, 25000, 12500, 1),
		// 	new CustomData("Сидоров Сергей", 2000, 1000, 1.5, 1000, 25000, 12500, 0),
		// 	new CustomData("Сидоров Сергей", 2000, 1000, 1, 1000, 25000, 12500, 0),
		// 	new CustomData("Сидоров Сергей", 2000, 1000, 1, 1000, 25000, 12500, 0),
		// 	new CustomData("Сидоров Сергей", 2000, 1000, null, 1000, 25000, 12500, 0),
		// 	new CustomData("Сидоров Сергей", 2000, 1000, 1, 1000, 25000, 12500, 0),
		// 	new CustomData("Сидоров Сергей", 2000, 1000, null, 1000, 25000, 12500, 1),
		// 	new CustomData("Сидоров Сергей", 2000, 1000, 2.1, 1000, 25000, 12500, 1),
		// 	new CustomData("Петрова Светлана", 1245, 1000, 1, 1000, 25000, 12500, 1)
        // ];
        
        this.FormLists()

		let obj = this;
		window.addEventListener("click", function (e) { obj.HideDetails(e); });
    }

    getResources()
    {
        this.rest.getResources().subscribe((rest:any) => {
            let temp = rest

            for(let i = 0; i < temp.length; i++)
            {
                this.resources.push(new Resource(temp[i]))
            }

            this.FormLists()
            this.appRef.tick()
        })
    }
    
    FormLists()
    {
        let prices_cols = [
            new ListCol("Ресурс", "pname"),
            new ListCol("Цена max", "pmin _center", true),
            new ListCol("Цена min", "pmin _center", true),
            new ListCol("коэф", "koef", true),
            new ListCol("Целевой доход", "pmin", true),
            new ListCol("Max доход в месяц", "pmax list__pmax_first", true),
            new ListCol("Min доход в месяц", "pmax list__pmax_last", true),
            new ListCol("Продажа", "service", true)
        ]

        let prices_rows = []

        this.income_goal = 0
        this.income_max = 0
        this.income_min = 0

        for(let i = 0; i < this.resources.length; i++)
        {
            let koef = ""
            if(this.resources[i].koef != null)
            {
                koef = String(this.resources[i].koef)
            }

            let sale = ""

            if(this.resources[i].sale == "0")
            {
                sale = "<div class='status_closed'><img src='assets/images/Lock.svg'class='status-img'> Заблокирована системой</div>"
            }
            else
            {
                sale = "<div class='status_active'><img src='assets/images/Active.svg'class='status-img'> Открыта</div>"
            }

            
            prices_rows.push(new ListRow([
                this.resources[i].name,
                Formatter.FormatMoney(Number(this.resources[i].price_max)),
                Formatter.FormatMoney(Number(this.resources[i].price_min)),
                this.resources[i].koef,
                Formatter.FormatMoney(Number(this.resources[i].income_goal)),
                Formatter.FormatMoney(Number(this.resources[i].income_max)),
                Formatter.FormatMoney(Number(this.resources[i].income_min)),
                sale
            ]))

            this.income_goal += Number(this.resources[i].income_goal)
            this.income_max += Number(this.resources[i].income_max)
            this.income_min += Number(this.resources[i].income_min)

        }

        this.prices_list = new ListData(prices_cols, prices_rows, "prices")

        this.income_goal_string = Formatter.FormatMoney(this.income_goal)
        this.income_max_string = Formatter.FormatMoney(this.income_max)
        this.income_min_string = Formatter.FormatMoney(this.income_min)

        let sum_rows = [new ListRow([
            "<div class='_status'>Всего ресурсов: " + this.resources.length + "</div>",
            "",
            "",
            "",
            "<div class='_status'>" + this.income_goal_string + "₽</div>",
            "<div class='_status'>" + this.income_max_string + "₽</div>",
            "<div class='_status'>" + this.income_min_string + "₽</div>",
        ])]
        let sum_options = new ListOptions(true, false, false, true)

        this.sum_list = new ListData(prices_cols, sum_rows, "sum", "", sum_options)

    }

	ShowDetails(i:number)
	{
		this.HideDetails();
		let block = document.getElementById("details_" + i);
		let btn = document.getElementById("details-btn_" + i);

		block.className = "details-menu details-menu_active";
		this.openedDetails = i;
	}

	HideDetails(e = null)
	{
		if(e != null)
		{
			if(e.target.className.includes("details"))
			{
				return;
			}
		}

		if(this.openedDetails >= 0)
		{
			let block = document.getElementById("details_" + this.openedDetails);
			block.className = "details-menu";
	
			this.openedDetails = -1;
		}
		
	}

}

class CustomData
{
	name:string;

	priceMax:number;
	priceMin:number;

	koef:number;

	goalIncome:number;
	maxMonthlyIncome:number;
	minMonthlyIncome:number;

	sale:number;

	constructor(name:string, priceMax:number, priceMin:number, koef:number, goalIncome:number, maxMonthlyIncome:number, minMonthlyIncome:number, sale:number)
	{
		this.name = name;
		
		this.priceMax = priceMax;
		this.priceMin = priceMin;

		this.koef = koef;

		this.goalIncome = goalIncome;
		this.maxMonthlyIncome = maxMonthlyIncome;
		this.minMonthlyIncome = minMonthlyIncome;

		this.sale = sale;
	}

}
