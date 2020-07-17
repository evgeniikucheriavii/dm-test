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
			new Client("Иванов Иван", 0, 15),
			new Client("Сидоров Сергей", 0, 10),
			new Client("Колесов А. В.", 0, 12),
			new Client("Петрова Светлана", 0, 5),
			new Client("Баярова Алина", 0, 22),
			new Client("Аппарат Экзарта", 0, 31),
			new Client("Платформа Галилео", 0, 3),
			new Client("Петрова Светлана", 0, 18),
			new Client("Баярова Алина", 0, 22),
			new Client("Петрова Светлана", 0, 33),
			new Client("Аппарат Экзарта", 0, 15),
			new Client("Платформа Галилео", 0, 10),
			new Client("Петрова Светлана", 0, 12),
			new Client("Аппарат Экзарта", 0, 5)
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

	constructor(fio:string, rfm:number, ltv:number)
	{
		this.fio = fio;
		this.rfm = rfm;
		this.ltv = ltv;
	}
}