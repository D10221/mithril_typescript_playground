
import {isEmpty} from './m-tools';

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

