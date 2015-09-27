import {Observable, IObservable} from "rx";

var m = <MithrilStatic>require('mithril');

export interface iView {
	view: () => MithrilVirtualElement,
	activeChanged: Observable<boolean>;
	setActive(value: boolean);
	isActive(): boolean;
	identity(): string;
}