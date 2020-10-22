export class PopupElement 
{
    title:string
    content:string
    type:string

    constructor(title:string, content:string, type:string = "")
    {
        this.title = title
        this.content = content
        this.type = type
    }
}
