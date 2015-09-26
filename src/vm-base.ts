import {Subject, Observable } from 'rx';
import {V, Val, isEmpty } from "./val";

export interface iViewModel<T>{
    withValue<TR>(func:(x:T)=> TR):Val<TR>;
    valueOf: <TR>(func:(x:T)=> TR) =>  TR;
    Action(action:(T)=> void):void;
    isActive:boolean;
    activeChanged:Observable<boolean>;
    changes:Observable<iChanged>;
    toJson(justSource?: boolean):string;
    identity: ()=> any; //TODO guid ?    
}

export class VmBase<T> implements iViewModel<T>{
    
    identity: ()=> any  ;
    
    private _target:T;

    constructor(target: T){
        
        this._target = target;
        
        this.toJson = (option) => {
            
             if(option) return JSON.stringify(this._target);       
        
            return JSON.stringify({
            target : this._target, isActive : this.isActive 
            });
        }
    }

    withValue: <TR>(func:(x:T)=> TR) =>  Val<TR> = (func) => {
        return V.create( isEmpty(this._target)? null  : func(this._target));
    };

    valueOf: <TR>(func:(x:T)=> TR) =>  TR = (func) => {
        return  isEmpty(this._target) ? null  : func(this._target);
    };

    Action : (action:(x:T) => void )=>void = (action)=>
    {
        if( isEmpty(this._target)) return;
        action(this._target) ;
    };
    
    private _isActive:boolean = false;
    
    get isActive():boolean{
        return this._isActive;
    }
   
    //@observable
    set isActive(value:boolean){
        
        if(this._isActive === value) {
            return;
        }
        
        this._isActive = value;        
        
        this.changes.onNext({key: "isActive", value: value});
    }
        
    get activeChanged () :Observable<boolean> {
        
        return this.changes
		.where(x=> x.key === "isActive")
		.select(x=> <boolean>x.value)
    }
    
    changes = new Subject<iChanged>(); 
    
    toJson(justTarget:boolean){ return null; }   
    
}

export interface iChanged {
    key:string;
    value:any;
}