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

        //"datetime": "2020-10-01T09:50:58+03:00",

        let vals = date.split("T")[0].split("-")
        let year = vals[0]
        let month = vals[1]
        let day = vals[2]

        return day + "." + month + "." + year
    }


    static FormatMoney(num:number)
    {
        let nfObject = new Intl.NumberFormat('ru-RU');
        let output = nfObject.format(num);

        return output; 
    }


    static GetSex(sex:string)
    {
        let s = ""

        if(sex == "1") 
        {
            s = "Мужчина"
        } 
        else if(sex == "0")
        {
            s = "Женщина"
        }
        else
        {
            s = "Оборудование"
        }

        return s
    }

    static GetAge(birthdate:string)
    {
        let bdt = Date.parse(birthdate)
        let nd = new Date(Date.now())
        let dt = new Date(bdt)

        let timeDiff = Math.abs(nd.getTime() - dt.getTime())
        let yearsDiff = Math.ceil(timeDiff / (1000 * 3600 * 24 * 365))

        let yearsStr = "" + yearsDiff
        let ageString = ""

        if(yearsStr.endsWith("11") || yearsStr.endsWith("12") || yearsStr.endsWith("13") || yearsStr.endsWith("14"))
        {
            ageString = yearsDiff + " лет"
        }
        else if(yearsStr.endsWith("1")) 
        {
            ageString = yearsDiff + " год"
        }
        else if(yearsStr.endsWith("2") || yearsStr.endsWith("3") || yearsStr.endsWith("4"))
        {
            ageString = yearsDiff + " года"
        }
        else 
        {
            ageString = yearsDiff + " лет"
        }

        return ageString
    }


    static GetShortName(name:string)
    {
        let w = name.split(" ")

        let shortname = ""
            
        if(w.length > 1)
        {

            w[1] = w[1][0] + "."
            shortname = w[0] + " " + w[1]

            if(w.length > 2)
            {
                w[2] = w[2][0] + "."
                shortname += " " + w[2]
            }
            
            
        }
        else 
        {
            shortname = this.name
        }

        return shortname
    }
}
