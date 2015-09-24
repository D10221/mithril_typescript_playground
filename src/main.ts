
var m = <MithrilStatic>require('mithril');
import {iAccount,iTask } from './entities' ; 
import { Div, Link, Button, NumberInput, DateInput,TimeInput, TextInput, Span} from './tags';
import { TaskController} from './task-controller' ; 
import {TaskView } from './task-view' ; 

class AppModule implements MithrilModule {	
			
	constructor(){
		
		var controller = new TaskController();
		
		this.controller = ()=>  controller; 
		
		this.view = (ctrl)=> {
			
		var tasks = ctrl._tasks.map(task => TaskView(task));
		
		return Div(

			Div(...tasks),

			NumberInput({ value: ctrl._task }),

			DateInput({ value: '1969-11-11' }),

			Button({ content: "Rotate links", click: ctrl.rotate })
			
			);
		}
	}
		
	controller: Function  ;

	view(ctrl:TaskController) { return null; }
}

//initialize
m.mount(document.body, new AppModule() );


