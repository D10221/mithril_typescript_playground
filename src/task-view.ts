var m = <MithrilStatic>require('mithril');

import {iAccount, iTask } from './entities';

import { Div, Link, Button, NumberInput, DateInput,TimeInput, TextInput, Span, Selector, Option} from './tags';

import { AccountController } from './account-controller';

import { Observable as O } from 'rx';
 
var accountController = new AccountController();

class TaskViewModel{
	
	_task:iTask;
	
	get id (){ return this._task.id ; }
	
	get date(){return this._task.date;}
	
	set date(value:string ) { this._task.date = value ; }
	
	get tile() {return this._task.title ; }
	
	set title(value:string ){ this._task.title = value ; }
	
	constructor(task:iTask){
		this._task = task;
		
	}
}

export function TaskView(task:iTask){
	
	var vm = new TaskViewModel(task);
			
	var accountSelector = new Selector("account-selector", accountController.accounts.map(account=> {
				return { 
					value: account.id, 
					text: account.name, 
					selected: account.id === task.account.id }
			}));
			
	accountSelector.onChange.subscribe(account=>{
		
		task.account = accountController.accounts.filter(a=> a.id === account.value )[0];
		
		alert(JSON.stringify(task));
	});
	
	return Div(
		
		DateInput({  value: task.date  }),
		
		TimeInput({  value: task.start }),
		
		TimeInput({  value: task.end }),
		
		accountSelector.render(),
		
		TextInput ({value: task.description }), 
						 
		Link({ href: `#/tasks/task/${vm.id}`, content: vm.title })
	)
}