import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import reducer from '../reducers';

function getStore( initialState ) {
	const loggerMiddleware = createLogger( { predicate: ( getState, actions ) => true } );

	const enhancer = compose(
		applyMiddleware(
			thunkMiddleware,
			loggerMiddleware
		)
	);

	return createStore( reducer, initialState, enhancer );
}

const initialState = {
	people: [],
	totalCount: 0,
	currentPage: 1,
	planets: {},
	showPlanetInfo: false,
	planetIdToBeShown: null,
	loadListInProgress: false
};

export default getStore( initialState );