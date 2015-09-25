import {VmBase} from './vm-base';
import {iTask , iAccount } from './entities' ;

export class TaskViewModel extends VmBase<iTask>{
    constructor(task:iTask){
        super(task);
    }
}