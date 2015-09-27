
var m = <MithrilStatic>require('mithril');
import { iAccount,iTask } from './entities' ;
import { Div, Link, Button, NumberInput, DateInput,TimeInput, TextInput, Span} from './tags';
import { TaskController} from './task-controller' ; 
import { TaskView } from './task-view' ;
import { TaskViewModel } from './task-viewmodel';
import {iView } from './iview'; 
import { iViewContext,ViewContext } from './view-context';
import { IDisposable} from 'rx';
import * as _ from 'lodash';
import { disposeThem , compute } from './m-tools';

var taskController = new TaskController();

class AppController {

    taskController:TaskController;

    constructor() {

        this.taskController = taskController;
    }
}

var appController = new AppController();

function toggleViews(views:iView[],active:iView){
    views
   .filter(v=> v!= active)
   .forEach(v=> compute(() => v.setActive(false)));
}

class AppModule implements MithrilModule {
    
    viewContext : iViewContext = new ViewContext();
    
    controller(){
        return appController;
    }        
    
	view(appController:AppController) {
        
        var subscriptions :IDisposable[] = [];
        
         var taskViews = appController
            .taskController
            ._tasks            
            //Show All Tasks
            .map(task => new TaskView(task,this.viewContext));
            
        var tasks = taskViews
            .map(iView=> {                
                 
                 subscriptions.push(                 
                 iView
                 .activeChanged
                 .where(e=>e)                 
                 .subscribe(activated=> toggleViews(taskViews,iView))                 
                 );//**                       
                
                return iView.view();
                });
                
        var configure = function(element,isInit,context){
            if(!isInit){
                element.unloaded = ()=> disposeThem(subscriptions);
            }            
        }         
       
        return m('div', {} , [
            m('div', {config: configure} , tasks)
        ])
    }
}

//initialize
m.mount(document.body, new AppModule());


