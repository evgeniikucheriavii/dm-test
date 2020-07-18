import { Component, OnInit } from '@angular/core';
import { Tab } from '../tab';

@Component({
	selector: 'app-recomendations-engine',
	templateUrl: './recomendations-engine.component.html',
	styleUrls: ['./recomendations-engine.component.css']
})
export class RecomendationsEngineComponent implements OnInit 
{
	tabs = [];
	currentTab:number;

	rules = [];
	currentRule:Rule;

	resources = [];

	constructor() { }

	ngOnInit(): void 
	{
		this.tabs = [
			new Tab("utilization-rules", "Правила экстренной утилизации"),
			new Tab("actions", "Action Center")
		];

		this.currentTab = 0;

		this.tabs[this.currentTab].Activate();

		this.rules = [
			new Rule("За 2 дня до утилизации", 30),
			new Rule("За 1 день до утилизации", 40),
			new Rule("В день утилизации", 50)
		];

		this.currentRule = this.rules[2];

		this.resources = [
			new Rule("Если ресурс >60% до цели ", 0),
			new Rule("Если ресурс 60<40% до цели ", 0),
			new Rule("Если ресурс 40<20% до цели ", 0),
			new Rule("Если ресурс 20<0% до цели ", 0),
			new Rule("Если ресурс 0<20% сверху цели ", 0),
			new Rule("Если ресурс 20%<40% сверху цели ", 0),
			new Rule("Если ресурс 40%<60% сверху цели", 0),
			new Rule("Если ресурс 60% сверху цели", 0)
		];
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


class Rule
{
	title:string;
	discount:number;

	constructor(title:string, discount:number)
	{
		this.title = title;
		this.discount = discount;
	}
}