import { DropdownItem } from './dropdown-item';

export class DropdownList 
{
    title:string
    name:string
    items:DropdownItem[] = []

    constructor(name:string, title:string, items:DropdownItem[])
    {
        this.name = name
        this.items = items
        this.title = title
    }
}
