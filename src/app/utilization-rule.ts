import { IUtilizationCat, IUtilizationRule } from './rest.service';
import { UtilizationCat } from './utilization-cat';

export class UtilizationRule implements IUtilizationRule
{
    id: string;
    percent_from: string;
    percent_to: string;
    is_up: boolean;
    discount: string;
    Category: UtilizationCat;

    str:string

    constructor(rule:IUtilizationRule, cat:UtilizationCat)
    {
        this.id = rule.id
        this.percent_from = rule.percent_from
        this.percent_to = rule.percent_to
        this.is_up = rule.is_up
        this.discount = rule.discount
        this.Category = cat

        this.str = "Если ресурс " + this.percent_from + "<" + this.percent_to + "%"

        if(this.is_up)
        {
            this.str += " свыше цели"
        }
        else
        {
            this.str += " до цели"
        }
    }

    toString()
    {
        return this.str
    }

}
