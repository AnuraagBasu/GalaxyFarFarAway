import * as types from './types';

import { URLs } from '../config/URLs';

export function fetchPeopleList( pageNumber = 1 ) {
	return ( dispatch, getState ) => {
		dispatch( fetchPeopleListInProgress() );

		return fetch( URLs.getPeople( pageNumber ) )
			.then( resp => resp.json() )
			.then( resp => {
				dispatch( setPeople( resp.results, resp.count, pageNumber ) );
			} )
			.catch( err => {
				//TODO: handle error
				console.log( "errro in fetching people" );
			} );
	};
}

export function togglePlanetInfo( planetId = null ) {
	return ( dispatch, getState ) => {
		let showPlanetInfo = false;
		if ( planetId ) {
			showPlanetInfo = true;

			if ( !getState().planets[ planetId ] ) {
				dispatch( fetchPlanetInfo( planetId ) );
			}
		}

		dispatch( {
			type: types.TOGGLE_PLANET_INFO,
			payload: {
				show: showPlanetInfo,
				planetId
			}
		} );
	};
}

function setPeople( people, totalCount, pageNumber = 1 ) {
	return {
		type: types.SET_PEOPLE_LIST,
		payload: {
			people,
			totalCount,
			pageNumber
		}
	};
}

function fetchPlanetInfo( planetId ) {
	return ( dispatch, getState ) => {
		return fetch( URLs.getPlanetInfo( planetId ) )
			.then( resp => resp.json() )
			.then( resp => {
				dispatch( setPlanetInfo( planetId, resp ) );
			} )
			.catch( err => {
				//TODO: handle error
				console.log( "error in fetching planet info" );
			} );
	};
}

function setPlanetInfo( planetId, planetInfo ) {
	const info = {
		id: planetId,
		name: planetInfo.name,
		diameter: planetInfo.diameter,
		climate: planetInfo.climate,
		population: planetInfo.population
	};

	return {
		type: types.SET_PLANET_INFO,
		payload: {
			info
		}
	};
}

function fetchPeopleListInProgress() {
	return {
		type: types.FETCH_PEOPLE_LIST_IN_PROGRESS
	};
}