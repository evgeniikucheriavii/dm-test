import { Component, OnInit } from '@angular/core';
import { Tab } from '../tab';

@Component({
	selector: 'app-clients',
	templateUrl: './clients.component.html',
	styleUrls: ['./clients.component.css']
})

export class ClientsComponent implements OnInit 
{
	tabs = [];
	sections = [];

	clients = [];
	
	currentClient:Client;
	currentTab:number;

	constructor() { }

	ngOnInit(): void 
	{

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

		this.currentClient = this.clients[2];

		this.currentClient.log = [
			new LogEntry("Консультативный прием", "Массаж 45 минут", "Колесов А.В.", "22.01.2020", true),
			new LogEntry("Детский консультативный прием", "Вибрационная терапия", "Калиниченко Д.С", "12.02.2019", true),
			new LogEntry("Электростатический массаж", "Тейпирование", "Колесов А.В.", "11.05.2018", true),
			new LogEntry("Коррекция ортопедическиз стелек", "Массаж 45 минут", "Калиниченко Д.С", "22.01.2020", true),
			new LogEntry("Консультативный прием", "Вибрационная терапия", "Колесов А.В.", "12.02.2019", true),
			new LogEntry("Детский консультативный прием", "Тейпирование", "Калиниченко Д.С", "11.05.2018", true),
			new LogEntry("Консультативный прием", "Массаж 45 минут", "Колесов А.В.", "22.01.2020", true),
			new LogEntry("Коррекция ортопедическиз стелек", "Вибрационная терапия", "Калиниченко Д.С", "12.02.2019", true),
			new LogEntry("Лечебная физкультура", "Тейпирование", "Колесов А.В.", "11.05.2018", true),
			new LogEntry("Лечебная физкультура", "Вибрационная терапия", "Калиниченко Д.С", "22.01.2020", true),
			new LogEntry("Консультативный прием", "Массаж 45 минут", "Калиниченко Д.С", "12.02.2019", true),
			new LogEntry("Детский консультативный прием", "Вибрационная терапия", "Калиниченко Д.С", "11.05.2018", true),
			new LogEntry("Консультативный прием", "Тейпирование", "Калиниченко Д.С", "22.01.2020", true),
			new LogEntry("Коррекция ортопедическиз стелек", "Вибрационная терапия", "Калиниченко Д.С", "12.02.2019", true),
			new LogEntry("Консультативный прием", "Массаж 45 минут", "Колесов А.В.", "11.05.2018", true)
		];

		this.currentClient.contacts = [
			new Contact(0, "88005553535", "20.03.2020"),
			new Contact(1, "mail@gmail.com", "20.03.2020")
		];

		this.currentClient.transactions = [
				new TransactionLog("Массаж 45 минут", "Колесов А. В.", 1500, "20.03.2020"),
				new TransactionLog("Вибрационная терапия", "Колесов А. В.", 1500, "20.03.2020"),
				new TransactionLog("Прием врача", "Колесов А. В.", 1500, "20.03.2020"),
				new TransactionLog("Массаж 45 минут", "Колесов А. В.", 1500, "20.03.2020"),
				new TransactionLog("Вибрационная терапия", "Колесов А. В.", 1500, "20.03.2020"),
				new TransactionLog("Прием врача", "Колесов А. В.", 1500, "20.03.2020"),
				new TransactionLog("Прием врача", "Колесов А. В.", 1500, "20.03.2020"),
				new TransactionLog("Прием врача", "Колесов А. В.", 1500, "20.03.2020"),
				new TransactionLog("Прием врача", "Колесов А. В.", 1500, "20.03.2020"),
				new TransactionLog("Прием врача", "Колесов А. В.", 1500, "20.03.2020")
		];

		this.tabs = [
			new Tab("contacts", "Контакты и транзакции"),
			new Tab("reserve", "Бронирование"),
			new Tab("log", "История обращений")
		];

		this.currentTab = 0;

		this.tabs[this.currentTab].Activate();
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
}


class Client
{
	fio:string;
	sale:boolean = false;
	rfm:number;
	ltv:number;

	log = [];
	contacts = [];
	transactions = [];

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

class Contact
{
	type:number;
	value:string;
	lastdate:string;
	typeString:string;

	constructor(type:number, value:string, lastdate:string)
	{
		this.type = type;
		this.value = value;
		this.lastdate = lastdate;

		if(this.type == 0)
		{
			this.typeString = "Телефон";
		}
		else
		{
			this.typeString = "Почта";
		}
	}
}

class TransactionLog
{
	service:string;
	master:string;
	date:string;
	sum:number;

	constructor(service:string, master:string, sum:number, date:string)
	{
		this.service = service;
		this.master = master;
		this.sum = sum;
		this.date = date;
	}
}

class LogEntry
{
	query:string;
	service:string;
	master:string;

	date:string;

	status:boolean;
	statusString:string;

	constructor(query:string, service:string, master:string, date:string, status:boolean)
	{
		this.query = query;
		this.service = service;
		this.master = master;
		this.date = date;
		this.status = status;

		if(this.status)
		{
			this.statusString = "Закрыта";
		} 
		else 
		{
			this.statusString = "Открыта";
		}
	}
}

