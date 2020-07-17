import { Component, OnInit } from '@angular/core';
import { Tab } from '../tab';

@Component({
	selector: 'app-clients',
	templateUrl: './clients.component.html',
	styleUrls: ['./clients.component.css']
})

export class ClientsComponent implements OnInit 
{

	clients = [];
	tabs = [];
	currentClient:string;
	currentTab:number;

	constructor() { }

	ngOnInit(): void 
	{
		this.currentClient = "Колесов А. В.";

		this.clients = [
			new Client("Иванов Иван", 1231, 44000),
			new Client("Сидоров Сергей", 1231, 63000),
			new Client("Колесов А. В.", 1131, 50000),
			new Client("Петрова Светлана", 3212, 7200),
			new Client("Баярова Алина", 2122, 22500),
			new Client("Аппарат Экзарта", 2312, 50345),
			new Client("Платформа Галилео", 1231, 63000),       
			new Client("Петрова Светлана", 1231, 50000),
			new Client("Баярова Алина", 1131, 7200),
			new Client("Петрова Светлана", 3212, 22500),
			new Client("Аппарат Экзарта", 2122, 50345),
			new Client("Платформа Галилео", 2312, 7200),
			new Client("Петрова Светлана", 1131, 22500),
			new Client("Аппарат Экзарта", 3212, 50345)
		];

		this.tabs = [
			new Tab("contacts", "Контакты и транзакции"),
			new Tab("reserve", "Бронирование"),
			new Tab("log", "История обращений")
		];

		this.currentTab = 0;

		this.tabs[this.currentTab].Activate();
	}

	SwitchTab(index:number)
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


class Client
{
	fio:string;
	sale:boolean = false;
	rfm:number;
	ltv:number;

	ltvString:string;
	
	constructor(fio:string, rfm:number, ltv:number)
	{
		this.fio = fio;
		this.rfm = rfm;
		this.ltv = ltv;

		this.ltvString = this.Format(ltv);
	}

	private Format(value:number)
	{
		let nfObject = new Intl.NumberFormat('ru-RU');
		let output = nfObject.format(value);

		return output; 
	}
}