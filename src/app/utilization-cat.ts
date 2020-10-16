import { IUtilizationCat, IUtilizationRule, ICompany } from "./rest.service"
import { UtilizationRule } from './utilization-rule';


export class UtilizationCat implements IUtilizationCat
{
    id:string
    day: string
    discount: string
    Company: ICompany
    Rules:IUtilizationRule[]

    str:string
    rules:UtilizationRule[] = []
    
    constructor(uCat:IUtilizationCat)
    {
        this.id = uCat.id
        this.day = "" + uCat.day
        this.discount = uCat.discount
        this.Company = uCat.Company
        this.Rules = uCat.Rules

        for(let i = 0; i < this.Rules.length; i++)
        {
            this.rules.push(new UtilizationRule(this.Rules[i], this))
        }

        let n = Number(this.day)

        if(n == 0)
        {
            this.str = "В день утилизации"
        }
        else
        {
            let d = ""

            if(this.day.endsWith("11") || this.day.endsWith("12") || this.day.endsWith("13") || this.day.endsWith("14"))
            {
                d = "дней"
            }
            else if(this.day.endsWith("11"))
            {
                d = "день"
            } 
            else if(this.day.endsWith("2") || this.day.endsWith("3") || this.day.endsWith("4"))
            {
                d = "дня"
            }
            else
            {
                d = "дней"
            }

            console.log(d)

            if(n > 0)
            {
                this.str = "Через " + Math.abs(n) + " " + d + " после утилизации"
            }
            else
            {
                this.str = "За " + Math.abs(n) + " " + d + " до утилизации"
            }
        }
        console.log(this.str)
    }

    addRule(rule:IUtilizationRule)
    {
        this.rules.push(new UtilizationRule(rule, this))
    }

    toString()
    {
        return this.str
    }
}
