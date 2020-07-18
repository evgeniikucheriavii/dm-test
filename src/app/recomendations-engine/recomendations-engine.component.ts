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

	constructor() { }

	ngOnInit(): void 
	{
		this.tabs = [
			new Tab("utilization-rules", "Правила экстренной утилизации"),
			new Tab("actions", "Action Center")
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
