export interface iAccount{
	id:number;
	name:string;
	description:string;
}

export interface iTask {
	id: number;
	title: string;
	description: string;
	date: string;
	start: string;
	end: string;
	account: iAccount;
}