import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

export const people = createReducer( {}, {
	[ types.SET_PEOPLE_LIST ]( state, action ) {
		return state.concat( action.payload.people );
	}
} );

export const totalCount = createReducer( {}, {
	[ types.SET_PEOPLE_LIST ]( state, action ) {
		return action.payload.totalCount;
	}
} );

export const currentPage = createReducer( {}, {
	[ types.SET_PEOPLE_LIST ]( state, action ) {
		return action.payload.pageNumber;
	}
} );

export const planets = createReducer( {}, {
	[ types.SET_PLANET_INFO ]( state, action ) {
		let newState = Object.assign( {}, state );
		newState[ action.payload.info.id ] = action.payload.info;

		return newState;
	}
} );

export const showPlanetInfo = createReducer( {}, {
	[ types.TOGGLE_PLANET_INFO ]( state, action ) {
		return action.payload.show;
	}
} );

export const planetIdToBeShown = createReducer( {}, {
	[ types.TOGGLE_PLANET_INFO ]( state, action ) {
		return action.payload.planetId;
	}
} );

export const loadListInProgress = createReducer( {}, {
	[ types.FETCH_PEOPLE_LIST_IN_PROGRESS ]( state, action ) {
		return true;
	},
	[ types.SET_PEOPLE_LIST ]( state, action ) {
		return false;
	}
} )