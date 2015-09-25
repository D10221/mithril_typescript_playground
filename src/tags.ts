/// <reference path="../typings/tsd.d.ts" />

import {Observable, Subject } from 'rx';
import * as _ from 'lodash';

var m = <MithrilStatic>require('mithril');

interface iLinkOptions {
	href:string;
	content: any
}
	
interface iButtonOptions{
	click:Function;
	content:any;
}

export function Link(options:iLinkOptions): MithrilVirtualElement {
	return m("a", { href: options.href, style: "margin:10px" }, options.content);
}

export function Button(options:iButtonOptions): MithrilVirtualElement {
	return m("button", { onclick: options.click }, options.content)
}

export function Div(...content:MithrilVirtualElement[]): MithrilVirtualElement {
	return m('div', {  }, content)
}
enum InputTypes{
	number, text, date, time, datetime
}
interface iInputOptions
{
	value: any ;
	type?: InputTypes ;
    readonly?:boolean;
}

export function NumberInput(options:iInputOptions){
	return m('input', {style:"margin: 10px", value: options.value, type: 'number'});
}

export function TextInput(options:iInputOptions){
    options.type = InputTypes.text;
	return Input(options);
}

export function DateInput(options:iInputOptions){
	return m('input', {style:"margin: 10px", value: options.value, type: 'date'});
}

export function TimeInput(options:iInputOptions){
	return m('input', {style:"margin: 10px", value: options.value, type: 'time'});
}

export function Input(options:iInputOptions){
	return m('input', {style:"margin: 10px", value: options.value, type: options.type });
}

export function Span(options){
	return m('span',{}, options.content);
}

export interface iOption {
	value: any;
	text: string;
	selected: boolean;
	//render():MithrilVirtualElement;
}

export function Option(option:iOption){

    var configure = function(element, isInit, context){
        if(option.selected === true){
            element.selected = true;
        }
    };

	return m("option", {  value: option.value, config: configure  }, option.text );
}

export class Selector {
	
	onChange = new Subject<iOption>();

    unLoaded = new Subject<boolean>();

	render():MithrilVirtualElement{	return null;}

	constructor( options: iOption[],id?: string)
	{
        var e;

		var configure = function(element, isInit:boolean, context){

            e = element;

            e.onunload = ()=> {
                this.onChange.completed();
                this.onChange.dispose();
                this.unLoaded.onNext(true);
                this.unLoaded.completed();
                this.unLoaded.dispose();
            };

            if(typeof found === 'undefined') {
                e.selectedIndex = -1;
            }
            //alert("configure isInit:" + isInit);
        };

        var found  = _.find(options, o => o.selected === true);

		var elements = options.map(o=> Option(o));

		this.render = ()=>{
			
			return m('select', {
					id: id,
                    //selectedIndex: selectedIndex,
                    config: configure,
					onchange: ()=> this.onChange.onNext(options[e.selectedIndex]),
				}
				, elements);
		}
	}

}