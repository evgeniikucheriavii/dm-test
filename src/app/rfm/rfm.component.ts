import { ApplicationRef, Component, OnInit } from '@angular/core';
import { Tab, TabsData } from '../tabs/tabs.component';
import { Resource } from '../resource'
import * as restservice from '../rest.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { PopupElement } from '../popup-element';
import { ListData, ListCol, ListRow, ListButton, ListOptions } from '../list/list.component';
import { first } from 'rxjs/operators';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ResourceFormComponent } from '../resource-form/resource-form.component';
import { Formatter } from '../formatter';
import { ProfileData } from '../profile/profile.component';
import { DropdownItem, DropdownList } from '../dropdown/dropdown.component';
import { TimeData } from '../time-table/time-table.component';
import { ThrowStmt } from '@angular/compiler';

@Component({
    selector: 'app-rfm',
    templateUrl: './rfm.component.html',
    styleUrls: ['./rfm.component.css']
})
export class RFMComponent implements OnInit 
{
    data:restservice.IRFMData

    criteria_lists:ListData[] = []
    groups_list:ListData
    settings_list:ListData

    constructor(public rest:restservice.RestService, private cookieService:CookieService, private router:Router, private appRef:ApplicationRef) { }

    ngOnInit(): void 
    {
        this.getRFM()
    }

    getRFM()
    {
        this.rest.getRFM().subscribe((rest:restservice.IRFMData) => {
            this.data = rest
            this.FormLists()
        })
    }

    FormLists()
    {
        this.FormCriteriaLists()
        this.FormGroupsList()
        this.FormSettingsList()
    }

    FormCriteriaLists()
    {
        let recency = []
        let frequency = []
        let monetary = []
        let wom = []

        for(let i = 0; i < this.data.criteria.length; i++)
        {
            switch(Number(this.data.criteria[i].cat))
            {
                case 1: recency.push(this.data.criteria[i]); break;
                case 2: frequency.push(this.data.criteria[i]); break;
                case 3: monetary.push(this.data.criteria[i]); break;
                case 4: wom.push(this.data.criteria[i]); break;
            }
        }


        let cols = [
            new ListCol("Клиентов", "service"),
            new ListCol("Группа", "service"),
            new ListCol("Критерий", "service"),
        ]

        let options = new ListOptions(false, true)

        let recency_rows = this.GetCriteriaRows(recency)
        let frequency_rows = this.GetCriteriaRows(frequency)
        let monetary_rows = this.GetCriteriaRows(monetary)
        let wom_rows = this.GetCriteriaRows(wom)

        this.criteria_lists = [
            new ListData(cols, recency_rows, "recency_criteria", "", options),
            new ListData(cols, frequency_rows, "frequency_criteria", "", options),
            new ListData(cols, monetary_rows, "monetary_criteria", "", options),
            new ListData(cols, wom_rows, "wom_criteria", "", options),
        ]

    }

    GetCriteriaRows(data:restservice.IRFMCriteria[])
    {
        let rows = []

        for(let i = 0; i < data.length; i++)
        {
            rows.push(new ListRow([
                data[i].clients,
                data[i].group,
                data[i].criteria
            ]))
        }

        return rows
    }


    FormGroupsList()
    {
        let cols = [
            new ListCol("Название", "name"),
            new ListCol("Группы", "type"),
            new ListCol("Количество", "pmin"),
        ]

        let rows = []

        let options = new ListOptions(false, true)

        this.groups_list = new ListData(cols, rows, "groups", "", options)
    }

    FormSettingsList()
    {
        let cols = [
            new ListCol("Виды", "name"),
            new ListCol("Группы", "type"),
        ]

        let rows = []

        for(let i = 0; i < this.data.settings.length; i++)
        {
            rows.push(new ListRow([
                this.data.settings[i].name,
                this.data.settings[i].groups,
            ]))
        }

        let options = new ListOptions(false, true)

        this.settings_list = new ListData(cols, rows, "settings", "", options)

    }


}
