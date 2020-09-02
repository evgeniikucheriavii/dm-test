export class ServiceLog
{
	service:string;
	duration:string;
	sum:number;

	sumFormat:string;

	constructor(service:string, duration:string, sum:number)
	{
		this.service = service;
		this.sum = sum;
		this.duration = duration;

		this.sumFormat = this.Format(this.sum);
	}

	private Format(value:number)
	{
		let nfObject = new Intl.NumberFormat('ru-RU');
		let output = nfObject.format(value);

		return output; 
	}
}
