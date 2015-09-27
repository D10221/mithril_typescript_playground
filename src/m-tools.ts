var m = <MithrilStatic>require('mithril');

import { IDisposable } from 'rx'

export function compute(f:()=>void){
    m.startComputation();
    f();
    m.endComputation();
}

export function disposeThem(subscriptions:IDisposable[]){
        if(subscriptions) subscriptions.forEach(s=>{if(s)s.dispose();});
}

export function isEmpty(value){
    return (typeof value === "undefined" || value === null);
}