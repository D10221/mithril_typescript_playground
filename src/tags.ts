/// <reference path="../typings/tsd.d.ts" />

var m = <MithrilStatic>require('mithril');

interface iLinkOptions {
	href:string;
	content: any
}
	
interface iButtonOptions{
	click:()=>void;
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