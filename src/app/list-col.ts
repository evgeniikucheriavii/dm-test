export class ListCol 
{
    name:string
    type:string
    sortable:boolean

    static types:string[] = [
        "name",
        "num"
    ]

    constructor(name:string, type:string, sortable:boolean = false)
    {
        this.name = name
        this.type = type
        this.sortable = sortable
    }

}
