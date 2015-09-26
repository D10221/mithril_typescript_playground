var m = <MithrilStatic>require('mithril');

import { Div, Link, Button, NumberInput, DateInput,TimeInput, TextInput, Span, Selector, Option, iOption} from './tags';

import {iAccount, iTask } from './entities';

import { AccountSelectorFactory , iAccountSelector } from './account-selector';

import { iViewModel, Val, V } from './vm-base';

import {Observable,IObservable} from "rx";

import {TaskViewModel } from './task-viewmodel';

import {VmBase} from './vm-base';

export interface iTaskView {	
	id:number;
	date:string;
	start: string;
	end:string;
	account: string;
	title:string ;
	description:string; 
}

export class TaskViewController {
	
	accountSelector: iAccountSelector ;  
	
	viewModel: iViewModel<iTask>;
	
	view: iTaskView ;
		
	constructor(task:iTask){
		
		this.viewModel = new VmBase<iTask>(task);
		
		this.accountSelector = AccountSelectorFactory(this.viewModel);
		 
		var accountchanged = this.accountSelector
				.selectionChanged				
				.subscribe(account=> {
					debugger;
					this.viewModel.Action(x => x.account = account);
				});
		
		this.accountSelector.unloaded.subscribe(e=> accountchanged.dispose);
			
		var desc=  this.viewModel.withValue(x=> x.account ).withValue(x=> x.description).orElse("?");
		
		this.view = this.viewModel.withValue(x=>{ 
			return  <iTaskView>{
			id: x.id,
			date: x.date,
			start: x.start,
			end: x.end,
			account: desc,
			description : 
			x.description,title: x.title 
			}}).value();
	}
}

export class TaskViewModule implements MithrilModule
{
	constructor(task:iTask){
		var controller = new TaskViewController(task);		
		this.controller = () => {			
			return controller;		
		}
	}		
	
	controller(){return null;}
	
	view(ctrl:TaskViewController ){
		
		return Div(
		
		DateInput({  value: ctrl.view.date  }),
		
		TimeInput({  value: ctrl.view.start}),
		
		TimeInput({  value: ctrl.view.end}),

		ctrl.accountSelector.vElement,

        TextInput({ value: ctrl.view.account, readonly: true}),
		
		TextInput ({value: ctrl.view.description }),
						 
		Link({ href: `#/tasks/task/${ctrl.view.id}`, content: ctrl.view.title })
	)
	}
}