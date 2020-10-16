import { ListCol } from './list-col';
import { ListRow } from './list-row';

export class ListData 
{
    title:string
    showTitle:boolean = true
    showId:boolean = true
    rows:ListRow[]
    cols:ListCol[]
    titleclasses:string
    listname:string = ""

    constructor(cols:ListCol[], rows:ListRow[], listname:string, title:string = "", showId:boolean = true, titleclasses:string = "")
    {
        this.rows = rows
        this.cols = cols
        this.title = title
        this.showId = showId
        this.titleclasses = titleclasses
        this.listname = listname

        if(title == "")
        {
            this.showTitle = false
        }
    }
    
}
