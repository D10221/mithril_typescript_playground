var m = <MithrilStatic>require('mithril');

import { Div, Link, Button, NumberInput, DateInput,TimeInput, TextInput, Span, Selector, Option, iOption} from './tags';

import {iAccount, iTask } from './entities';

import AccountSelector from './account-selector';

import { iViewModel, Val, V } from './vm-base';

import {Observable,IObservable} from "rx";

export function TaskView(task:iViewModel<iTask>){
	
	var desc=  task.withValue(x=> x.account ).withValue(x=> x.description).orElse("?");

	var accountSelector = AccountSelector(task);

	var accountchanged = accountSelector
        .selectionChanged
        .subscribe(account=> {
		task.Action( x => x.account = account);
	});

    accountSelector.unloaded.subscribe(e=> accountchanged.dispose());

	//task.Action( x => x.account = accountController.byId(option.value))
	return Div(
		
		DateInput({  value: task.value(x=>x.date)  }),
		
		TimeInput({  value: task.value(x=>x.start) }),
		
		TimeInput({  value: task.value(x=>x.end) }),

		accountSelector.vElement,

        TextInput({ value: desc, readonly: true}),
		
		TextInput ({value: task.value(x=>x.description) }),
						 
		Link({ href: `#/tasks/task/${task.withValue(x=>x.id)}`, content: task.withValue(x=>x.title) })
	)
}

