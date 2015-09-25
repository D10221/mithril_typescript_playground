var m = <MithrilStatic>require('mithril');

import { Div, Link, Button, NumberInput, DateInput,TimeInput, TextInput, Span, Selector, Option, iOption} from './tags';

import {iAccount, iTask } from './entities';

import AccountSelector from './account-selector';

import { iViewModel, Val, V } from './vm-base';



export function TaskView(task:iViewModel<iTask>){

	debugger;
	
	var desc=  task.getValue(x=> x.account ).with(x=> x.description).orElse("?");
	
	return Div(
		
		DateInput({  value: task.value(x=>x.date)  }),
		
		TimeInput({  value: task.value(x=>x.start) }),
		
		TimeInput({  value: task.value(x=>x.end) }),

        AccountSelector(task),

        TextInput({ value: desc, readonly: true}),
		
		TextInput ({value: task.value(x=>x.description) }),
						 
		Link({ href: `#/tasks/task/${task.getValue(x=>x.id)}`, content: task.getValue(x=>x.title) })
	)
}

