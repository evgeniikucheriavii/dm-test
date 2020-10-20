import { Component, OnInit } from '@angular/core';
import { ListData, ListCol, ListRow } from '../list/list.component';

@Component({
	selector: 'app-prices',
	templateUrl: './prices.component.html',
	styleUrls: ['./prices.component.css']
})
export class PricesComponent implements OnInit 
{

    data = [];
    prices = []
    openedDetails:number = -1;
    
    prices_list:ListData

    constructor() { }
    
    

	ngOnInit(): void 
	{

        this.FormLists()

		this.data = [
			new Resource("Иванов Иван", 2000, 1000, 1, 1000, 25000, 12500, 1),
			new Resource("Сидоров Сергей", 2000, 1000, 1, 1000, 25000, 12500, 0),
			new Resource("Сидоров Сергей", 2000, 1000, 1, 1000, 25000, 12500, 1),
			new Resource("Сидоров Сергей", 2000, 1000, null, 1000, 25000, 12500, 1),
			new Resource("Сидоров Сергей", 2000, 1000, 0.83, 1000, 25000, 12500, 1),
			new Resource("Сидоров Сергей", 2000, 1000, null, 1000, 25000, 12500, 1),
			new Resource("Сидоров Сергей", 2000, 1000, 1, 1000, 25000, 12500, 1),
			new Resource("Сидоров Сергей", 2000, 1000, null, 1000, 25000, 12500, 1),
			new Resource("Сидоров Сергей", 2000, 1000, 1.5, 1000, 25000, 12500, 0),
			new Resource("Сидоров Сергей", 2000, 1000, 1, 1000, 25000, 12500, 0),
			new Resource("Сидоров Сергей", 2000, 1000, 1, 1000, 25000, 12500, 0),
			new Resource("Сидоров Сергей", 2000, 1000, null, 1000, 25000, 12500, 0),
			new Resource("Сидоров Сергей", 2000, 1000, 1, 1000, 25000, 12500, 0),
			new Resource("Сидоров Сергей", 2000, 1000, null, 1000, 25000, 12500, 1),
			new Resource("Сидоров Сергей", 2000, 1000, 2.1, 1000, 25000, 12500, 1),
			new Resource("Петрова Светлана", 1245, 1000, 1, 1000, 25000, 12500, 1)
		];

		let obj = this;
		window.addEventListener("click", function (e) { obj.HideDetails(e); });
    }
    
    FormLists()
    {
        let prices_cols = [
            new ListCol("Ресурс", "pname"),
            new ListCol("Цена max", "pmin _center", true),
            new ListCol("Цена min", "pmin _center", true),
            new ListCol("коэф", "koef", true),
            new ListCol("Max доход в месяц", "pmax list__pmax_first", true),
            new ListCol("Min доход в месяц", "pmax list__pmax_last", true),
            new ListCol("Продажа", "service", true)
        ]

        let prices_rows = []

        for(let i = 0; i < this.prices.length; i++)
        {
            prices_rows.push(new ListRow(["", ""]))
        }

        this.prices_list = new ListData(prices_cols, prices_rows, "prices")

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

class Resource
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
