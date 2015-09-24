/// <reference path="../typings/tsd.d.ts" />

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
	return m('div', { style: "margin: 10px" }, content)
}
enum InputTypes{
	number, text, date, time, datetime
}
interface iInputOptions
{
	value: any ;
	type?: InputTypes ;	
}

export function NumberInput(options:iInputOptions){
	return m('input', {style:"margin: 10px", value: options.value, type: 'number'});
}

export function TextInput(options:iInputOptions){
	return m('input', {style:"margin: 10px", value: options.value, type: 'text'});
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
	return m('span',{style: "margin: 10px"}, options.content);
}

interface iOption {
	value: any;
	text: string;
	selected: boolean;
	//render():MithrilVirtualElement;
}

export function Option(option:iOption){
	return m("option", { style : "" , value: option.value }, option.text );
}

export function Selector(...options:iOption[]){
	return m('select', { style:"margin: 10px" }, options.map(o=> Option(o)))
}