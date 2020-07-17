import { Component, OnInit } from '@angular/core';

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