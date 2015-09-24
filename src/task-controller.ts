import {iAccount, iTask } from './entities' ; 

var m = <MithrilStatic>require('mithril');

export class TaskController {
	
	value: number = 0;

	_task: iTask;

	_tasks: iTask[];

	constructor() {

		this.list().then(task=> this._tasks = task);

		this.rotate = () => {
			this._tasks.push(this._tasks.shift());
		};
	}

	list(): MithrilPromise<iTask[]> {
		return m.request({ method: "GET", url: "data/tasks.json" });
	}

	rotate: Function = () => {
		
		this._tasks.push(this._tasks.shift());

		m.startComputation();
		this.value++;
		m.endComputation();
	};
}

