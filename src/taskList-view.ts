
import { iAccount,iTask } from './entities' ;
import { Div, Link, Button, NumberInput, DateInput,TimeInput, TextInput, Span} from './tags';
import { TaskController} from './task-controller' ;
import { TaskView } from './task-view' ;

export class TaskListView
{

   construcor(ctrl){

       return ctrl._tasks.map(task => TaskView(task));
    }
}