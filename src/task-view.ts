var m = <MithrilStatic>require('mithril');

import { Div, Link, Button, NumberInput, DateInput, TimeInput, TextInput, Span, Selector, Option, iOption} from './tags';
import { iAccount, iTask } from './entities';
import { AccountSelectorFactory, iAccountSelector } from './account-selector';
import { iViewModel} from './vm-base';
import { Observable, IObservable} from "rx";
import { TaskViewModel } from './task-viewmodel';
import { VmBase} from './vm-base';
import { iView , iViewContext ,ViewStates} from "./iview";

export class TaskView implements iView {
	
	view: ()=> MithrilVirtualElement;
	activeChanged :Observable<boolean>;	
	isActive:()=> boolean;
	setActive:(value:boolean)=> void;
	identity: ()=> any;
	
	constructor(task: iTask,viewContext:iViewContext) {
				
		var vm:iViewModel<iTask> = new VmBase(task);
								
		vm.identity = ()=> task ? task.id : 0;
			
		this.activeChanged = vm.activeChanged;						
				
		this.isActive = () => vm.isActive;
		
		this.setActive = (value)=> { vm.isActive = value; };
		
		this.identity = vm.identity;
		
		var vmStateChanged = this.activeChanged
		.subscribe(e=> 
			{
				m.startComputation();
				viewContext.setViewState(this);
				m.endComputation();
			}
		);						

		var accountSelector = AccountSelectorFactory(vm);

		var accountchanged = accountSelector
			.selectionChanged
			.subscribe(account=> {
				vm.Action(x => x.account = account);
			});

		accountSelector.unloaded.subscribe(e=> accountchanged.dispose());				

		var configure = function(element, isInitialized, context) {
						
			if (!isInitialized) {																				
				
				var clicks = Observable
					.fromEvent(element, "click")				
					.subscribe(e=> vm.isActive = ! vm.isActive );

				element.unloaded = () => {
					clicks.dispose();
					vmStateChanged.dispose();
				}
			}
		}	
		
		var state = viewContext.getViewSTate(this);
		if(state){
			vm.isActive = state.state === ViewStates.active;
			console.log(`restored state id:${this.identity()}, active:${vm.isActive}`);			
		}
		
		this.view = () => {
			if (vm.isActive) {
				
				console.log(`return Active View id:${vm.identity()}`);
				
				return m('div', {config:configure}
					,[
						DateInput({ value: vm.valueOf(x=> x.date) }),
	
						TimeInput({ value: vm.valueOf(x=> x.start) }),
		
						TimeInput({ value: vm.valueOf(x=> x.end) }),
		
						accountSelector.vElement,
		
						TextInput({ value: vm.withValue(x=> x.account).withValue(x=> x.description).orElse("?"), readonly: true }),
		
						TextInput({ value: vm.valueOf(x=> x.description) }),
		
						Link({ href: `#/tasks/task/${vm.withValue(x=> x.id) }`, content: vm.withValue(x=> x.title) })
					]
				);
			}
			console.log(`return No Active View id:${vm.identity()}`);
			return  m('div', { config: configure }, vm.toJson(false));
		}
		
		
	}

}


