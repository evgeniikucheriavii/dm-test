import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'app-graph',
    inputs: ['graph_data'],
    template: `
    <div class='canvas-container'>
        <canvas #canvas width='1200' height='200' class='canvas'></canvas>
        <div>
            <button class='button' (click)='Select(-1)'>Все</button>
            <button class='button' (click)='Select(i)' *ngFor='let l of graph_data.lines; let i = index'>{{l.name}}</button>
        </div>
    </div>
    `,
    styles: [
        '.canvas { background: #fff; width: 100%; display: block; }',
        '.canvas-container { margin-bottom: 0px; }'
    ]
})
export class GraphComponent implements OnInit 
{
    @ViewChild('canvas', { static: true })
    canvas: ElementRef<HTMLCanvasElement>
    graph_data:GraphData = null
    private ctx:CanvasRenderingContext2D = null

    width:number = 0
    height:number = 0

    xOffset:number = 10
    yOffset:number = 10
    yStart:number = 0

    xStep:number = 10
    yStep:number = 10
    yD:number = 0
    valD:number = 0

    cols:number = 5
    rows:number = 6

    lineColor:string = "#777"

    constructor() { }

    ngOnInit(): void 
    {
        this.ctx = this.canvas.nativeElement.getContext('2d');
        this.width = this.canvas.nativeElement.width
        this.height = this.canvas.nativeElement.height

        let lines = []

        let names = [
            "Доступность",
            "Оказано услуг",
            "Стоимость человекочаса",
            "Max доход",
            "Целевой доход",
            "Min доход",
            "Коэф",
        ]

        let colors = [
            "#f00",
            "#0f0",
            "#00f",
            "#ff0",
            "#f0f",
            "#0ff",
            "#ссf",
        ]

        for(let i = 1; i < 8; i++)
        {
            let nodes = [
                new GraphNode(150 * i, ""),
                new GraphNode(300 * i, ""),
                new GraphNode(500 * i, ""),
                new GraphNode(220 * i, ""),
                new GraphNode(700 * i, ""),
                new GraphNode(67 * i, ""),
            ]

            if(i == 7)
            {
                nodes = [
                    new GraphNode(100, ""),
                    new GraphNode(80, ""),
                    new GraphNode(50, ""),
                    new GraphNode(23, ""),
                    new GraphNode(30, ""),
                    new GraphNode(60, ""),
                ]
            }

            lines.push(new GraphLine(names[i - 1], colors[i - 1], nodes))
        }

        this.graph_data = new GraphData("", lines)

        this.InitValues()

        this.Update()
    }

    InitValues()
    {
        this.ctx.font = "16px arial"

        this.xOffset = this.width * 0.07
        this.yOffset = this.height * 0.07
        this.yStart = this.height - this.yOffset

        this.xStep = (this.width - this.xOffset * 2) / this.cols
        this.yStep = (this.height - this.yOffset * 2) / this.cols

        this.yD = (this.height - this.yOffset * 2) / this.graph_data.max
        this.valD = this.graph_data.max / this.cols

    }

    Update()
    {
        this.Draw()
    }

    Draw()
    {
        this.ctx.clearRect(0, 0, this.width, this.height)

        this.DrawGrid()
        this.DrawData()

    }

    DrawGrid()
    {
        this.ctx.strokeStyle = this.lineColor
        this.ctx.beginPath()

        for(let i = 0; i < this.cols; i++)
        {
            // Horizontal 
            this.ctx.moveTo(this.xOffset, i * this.yStep + this.yOffset)
            this.ctx.lineTo(this.width - this.xOffset, i * this.yStep + this.yOffset)

            // Vertical 
            this.ctx.moveTo(i * this.xStep + this.xOffset, this.yOffset)
            this.ctx.lineTo(i * this.xStep + this.xOffset, this.height - this.yOffset)
        }

        this.ctx.moveTo(this.xOffset, this.height - this.yOffset)
        this.ctx.lineTo(this.width - this.xOffset, this.height - this.yOffset)

        this.ctx.moveTo(this.width - this.xOffset, this.yOffset)
        this.ctx.lineTo(this.width - this.xOffset, this.height - this.yOffset)

        this.ctx.stroke()

        this.ctx.textBaseline = "middle"
        this.ctx.textAlign = "right"

        for(let i = 0; i <= this.cols; i++)
        {
            // Value
            let val = String(this.valD * i)
            let length = 16
            this.ctx.fillText(val, this.xOffset - length, this.yStart - i * this.yStep)
        }

    }

    DrawData()
    {
        let lines = []

        if(this.graph_data.selected == -1)
        {
            lines = this.graph_data.lines
        }
        else
        {
            lines = [this.graph_data.lines[this.graph_data.selected]]
        }
        
        this.ctx.lineWidth = 3
        this.ctx.lineCap = 'round'

        for(let i = 0; i < lines.length; i++)
        {
            this.ctx.strokeStyle = lines[i].color

            let nodes = lines[i].nodes

            this.ctx.beginPath()

            this.ctx.moveTo(this.xOffset, this.yStart - nodes[0].value * this.yD)

            for(let j = 1; j < nodes.length; j++)
            {
                this.ctx.lineTo(j * this.xStep + this.xOffset, this.yStart - nodes[j].value * this.yD)
            }

            this.ctx.stroke()
        }

        this.ctx.lineWidth = 1
        this.ctx.lineCap = 'butt'
    }

    Select(index:number)
    {
        this.graph_data.Select(index)
        this.InitValues()
        this.Update()
    }

}

export class GraphData
{
    name:string = ""
    lines:GraphLine[] = []

    min:number = 0
    max:number = 0

    selected:number = -1

    constructor(name:string, lines:GraphLine[])
    {
        this.name = name
        this.lines = lines
        this.InitValues()
    }

    Select(index:number)
    {
        this.selected = index
        this.InitValues()
    }

    InitValues()
    {
        if(this.selected == -1)
        {
            for(let i = 0; i < this.lines.length; i++)
            {
                if(this.min > this.lines[i].min)
                {
                    this.min = this.lines[i].min
                }

                if(this.max < this.lines[i].max)
                {
                    this.max = this.lines[i].max
                }
            }
        }
        else
        {
            this.min = this.lines[this.selected].min
            this.max = this.lines[this.selected].max
        }
    }

}

export class GraphLine
{
    name:string = ""
    color:string = "#f00"
    nodes:GraphNode[] = []

    min:number = 0
    max:number = 0

    constructor(name:string, color:string, nodes:GraphNode[])
    {
        this.name = name
        this.color = color
        this.nodes = nodes

        this.InitValues()
    }

    InitValues()
    {
        for(let i = 0; i < this.nodes.length; i++)
        {
            if(this.min > this.nodes[i].value)
            {
                this.min = this.nodes[i].value
            }

            if(this.max < this.nodes[i].value)
            {
                this.max = this.nodes[i].value
            }
        }
    }
}

export class GraphNode
{
    value:number
    date:string

    constructor(value:number, date:string)
    {
        this.value = value
        this.date = date
    }
}

