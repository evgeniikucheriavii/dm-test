import { Component, OnInit } from '@angular/core';
import { ListCol, ListData, ListOptions, ListRow } from '../list/list.component';

@Component({
    selector: 'app-help',
    templateUrl: './help.component.html',
    styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit 
{

    listdata:ListData

    resources = [];
    nodes:FileNode[] = [];
    fileTreeHtml:string;

    constructor() { }

    ngOnInit(): void 
    {
        this.resources = [
            { day: "Понедельник", time: "10:00-21:00" },
            { day: "Вторник", time: "10:00-21:00" },
            { day: "Среда", time: "10:00-21:00" },
            { day: "Четверг", time: "10:00-21:00" },
            { day: "Пятница", time: "10:00-21:00" },
            { day: "Суббота", time: "Выходной" },
            { day: "Воскресенье", time: "Выходной" }
        ];

        this.nodes = [
            new FileNode(0, "Рассписание работы филиалов", [
                new FileNode(1, "Офис 1 - Москва"),
                new FileNode(1, "Офис 2 - Зеленоград", [], true),
                new FileNode(1, "Офис 3 - Долгопрудный")
            ]),
            new FileNode(0, "Другая ветвь", [
                new FileNode(1, "Пункт"),
                new FileNode(1, "Пункт")
            ])
        ];
        
        this.FormLists()

        // this.fileTreeHtml = this.GetTree(this.fileTree);
    }

    FormLists()
    {
        this.GetTree(this.nodes)
        this.FormNodesList()
    }

    FormNodesList()
    {
        let cols = [
            new ListCol("День недели", "name"),
            new ListCol("Время работы", "type"),
        ]

        let rows = []

        for(let i = 0; i < this.resources.length; i++)
        {
            rows.push(new ListRow([this.resources[i].day, this.resources[i].time]))
        }

        let nodes_options = new ListOptions(true, true)

        this.listdata = new ListData(
            cols, 
            rows, 
            "nodes", 
            "", 
            nodes_options
            )
    }


    private GetTree(nodes:FileNode[])
    {
        let html:string = "";

        for(let i = 0; i < nodes.length; i++)
        {
            let children:string = "";
            
            if(nodes[i].children.length > 0)
            {
                children = this.GetTree(nodes[i].children);
            }

            let img:string = "";

            if(nodes[i].type == 0)
            {
                img = "Folder";
            } 
            else
            {
                if(nodes[i].active)
                {
                    img = "File_active";
                }
                else
                {
                    img = "File";
                }
            }

            html += "<div class='node'><div class='node__name'><img src='assets/images/" + img + ".svg' class='node__image'>" + nodes[i].name + "</div><div class='node__children'>" + children + " </div></div>";
        }

        return html;
    }

}

class FileNode
{
    type:number;
    name:string;
    children:FileNode[] = [];
    active:boolean;
    img:string;

    constructor(type:number, name:string, children:FileNode[] = [], active:boolean = false)
    {
        this.type = type;
        this.name = name;
        this.children = children;
        this.active = active;

        if(this.type == 0)
        {
            this.img = "Folder";
        } 
        else
        {
            if(this.active)
            {
                this.img = "File_active";
            }
            else
            {
                this.img = "File";
            }
        }
    }
}
