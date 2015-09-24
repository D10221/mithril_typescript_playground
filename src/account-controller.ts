import {iAccount, iTask } from './entities' ; 

var m = <MithrilStatic>require('mithril');

export class AccountController{
	accounts:iAccount[] ;
	
	constructor(){
		this.list().then(accounts=> this.accounts = accounts ) ; 
	}
	list(): MithrilPromise<iAccount[]> {
		return m.request({ method: "GET", url: "data/accounts.json" });
	}
}