import {iView} from './iview' ;
import * as _ from "lodash";
var store = <StoreJSStatic>require('store');
import { loggerFty,iLogger  } from './logger';
import {isEmpty} from './m-tools';

export enum ViewStates { active, inactive };

interface iViewState {
	id: any;
	state: ViewStates;
}

export interface iViewContext {
	viewState: iViewState[];
	getViewState(view: iView): iViewState;
	setViewState(view: iView, state?: iViewState);

}

var viewState: iViewState[] = [];

var log :iLogger ; 

export class ViewContext implements iViewContext {
	
	get viewState(): iViewState[] {
		return viewState;
	}

	constructor() {
		log = loggerFty("ViewContext");
		var context = store.get("viewContext");
		if(!isEmpty(context)){
			log.info(`found context: ${JSON.stringify(context)}`);
			viewState = context.viewState;
		}
		
	}

	getViewState(view: iView): iViewState {

		var found = _.find(viewState, s=> s.id === view.identity());
		if (!found) log.info(`state not found for id ${view.identity() }`);

		return found;
	}

	setViewState(view: iView, state?: iViewState) {

		var oldState = this.getViewState(view);

		if (oldState) {

			log.info(`remove state id:${oldState.id}, state:${oldState.state}`);

			_.remove(viewState, oldState);
		}

		log.info(`adding state id:${view.identity() }, state active:${view.isActive() }`);

		viewState.push({
			id: view.identity(),
			state: view.isActive() ? ViewStates.active : ViewStates.inactive
		});
		
		store.set('viewContext', { viewState: viewState} );
	}
}