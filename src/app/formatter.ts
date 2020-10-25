export class Formatter 
{
    static FormatDateTime(date:string)
    {
        let d = Formatter.FormatDate(date)
        let t = Formatter.FormatTime(date)

        return  d + " " + t
    }

    static FormatTime(time:string)
    {
        let d = new Date(time)

        let hN = d.getHours()

        let hour = String(hN)

        if(Number(hN) < 10)
        {
            hour = "0" + String(hN)
        }

        let minN = d.getMinutes()

        let minutes = String(minN)

        if(Number(minN) < 10)
        {
            minutes = "0" + String(minN)
        }

        return hour + ":" + minutes
    }

    static FormatDate(date:string)
    {
        let d = new Date(date)

        let dN = d.getDay()
        let day = String(dN)

        if (Number(dN) < 10)
        {
            day = "0" + String(dN)
        }

        let mN = d.getMonth()
        let month = String(mN)

        if (Number(mN) < 10)
        {
            month = "0" + String(mN)
        }

        return day + "." + month + "." + d.getFullYear()
    }



}
