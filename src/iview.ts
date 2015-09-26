import {Observable, IObservable} from "rx";
import * as _ from "lodash";
var m = <MithrilStatic>require('mithril');

export enum ViewStates { active, inactive };

interface iViewState {
	id: any;
	state: ViewStates;
}

export interface iViewContext {
	viewState: iViewState[];
	getViewSTate(view: iView): iViewState;
	setViewState(view: iView, state?: iViewState);

}

export interface iView {
	view: () => MithrilVirtualElement,
	activeChanged: Observable<boolean>;
	setActive(value: boolean);
	isActive(): boolean;
	identity(): string;
}


var viewState: iViewState[] = [];

export class ViewContext implements iViewContext {
	viewState: iViewState[] = [];

	constructor() {

	}

	getViewSTate(view: iView): iViewState {

		var found = _.find(viewState, s=> s.id === view.identity());
		if (!found) console.log(`state not found for id ${view.identity() }`);

		return found;
	}

	setViewState(view: iView, state?: iViewState) {

		var oldState = this.getViewSTate(view);

		if (oldState) {

			console.log(`remove state id:${oldState.id}, state:${oldState.state}`);

			_.remove(viewState, oldState);
		}

		console.log(`adding state id:${view.identity() }, state active:${view.isActive() }`);

		viewState.push({
			id: view.identity(),
			state: view.isActive() ? ViewStates.active : ViewStates.inactive
		});
	}
}