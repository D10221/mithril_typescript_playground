
var m = <MithrilStatic>require('mithril');

import { Div, Link, Button } from './tags';

interface iLink {
	url: string;
	title: string;
}

var Page = {
	list: function() {
		return m.request({ method: "GET", url: "data/pages.json" });
	}
};

class Controller 
{
	page: iLink;
	
	pages: iLink[];

	constructor() {
		
		this.list().then(p=> this.pages = p);
		
		this.rotate = () => {
			this.pages.push(this.pages.shift());
		};
	}

	list(): MithrilPromise<iLink[]> {
		return m.request({ method: "GET", url: "data/pages.json" });
	}

	rotate: () => void;
}

var controller = new Controller();

var module = {

	controller: () => controller,

	view: ctrl => Div(

		Div(ctrl.pages.map(page => Link({ href: "#", content: page.title }))),

		Button({ content: "Rotate links", click: ctrl.rotate })
	)

};

//initialize
m.mount(document.body, module);


