/// <reference path="../typings/tsd.d.ts" />

var m = <MithrilStatic>require('mithril');

var msx = <Api>require('msx');

export interface iOptions {
	precompile?: boolean;
	sourceMap?: boolean;
	harmony?:boolean;
}

export interface Api {

	transform(source: String, options?: iOptions): MithrilVirtualElement;
	exec (source: String, options?: iOptions) : MithrilVirtualElement;
	
} 
export default msx;
