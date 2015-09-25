
export interface iViewModel<T>{
    withValue<TR>(func:(x:T)=> TR):Val<TR>;
    value: <TR>(func:(x:T)=> TR) =>  TR;
    Action(action:(T)=> void):void;
}

function then<T,TR>(out:Val<T> ,convert:(t:T) => TR ): Val<TR> {
    return V.create(
            out.isValid() ? convert(out.value()) : null
        );
}

export class V {

    static create<T>(x:T): Val<T> {

   return {

        isValid: ()=> !isEmpty(x) ,

        value: ()=> x ,

        withValue : function<TR>(convert:(v:T)=> TR) {
            return V.create( isEmpty(x) ? null : convert(x))
        }

       ,orElse: (v:T)=> isEmpty(x) ? v : x  
    }
}

}

export interface Val<T>{
     isValid() : boolean;
     value(): T ;
     withValue<TR>(convert:(t:T) => TR ): Val<TR> ;
     orElse: (x:T)=> T;
}

function isEmpty(value){
    return (typeof value === "undefined" || value === null);
}

export class VmBase<T> implements iViewModel<T>{

    private _target:T;

    constructor(target: T){
        this._target = target;
    }

    withValue: <TR>(func:(x:T)=> TR) =>  Val<TR> = (func) => {
        return V.create( isEmpty(this._target)? null  : func(this._target));
    };

    value: <TR>(func:(x:T)=> TR) =>  TR = (func) => {
        return  isEmpty(this._target) ? null  : func(this._target);
    };

    Action : (action:(x:T) => void )=>void = (action)=>
    {
        if( isEmpty(this._target)) return;
        action(this._target) ;
    };
}