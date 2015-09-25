
var m = <MithrilStatic>require('mithril');
import { iAccount,iTask } from './entities' ;
import { Div, Link, Button, NumberInput, DateInput,TimeInput, TextInput, Span} from './tags';
import { TaskController} from './task-controller' ; 
import { TaskView } from './task-view' ;
import { TaskViewModel } from './task-viewmodel';

var taskController = new TaskController();

class AppController {

    taskController:TaskController;

    constructor() {

        this.taskController = taskController;
    }
}

var appController = new AppController();

class AppModule implements MithrilModule {

    constructor() {
        this.controller.bind(this);
        this.view.bind(this);
    }

	controller(){
        return appController;
    }

	view(appController:AppController) {

        var tasks = appController
            .taskController
            ._tasks
            .map(task=> new TaskViewModel(task))
            .map(task => TaskView(task));

        return Div(
            Div(...tasks)
        );
    }
}

//initialize
m.mount(document.body, new AppModule() );


