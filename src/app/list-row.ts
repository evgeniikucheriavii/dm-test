import { ListCol } from './list-col';

export class ListRow 
{
    values:string[]
    isTitle:boolean = false

    constructor(values:string[], isTitle:boolean = false)
    {
        this.values = values
        this.isTitle = isTitle
    }
}
