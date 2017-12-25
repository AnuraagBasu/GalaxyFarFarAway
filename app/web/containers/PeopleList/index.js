import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import { ActionCreators } from '../../../core/actions';

import Table from '../../components/Table';
import Popup from '../../components/Popup';

import Styles from './styles.css';

class PeopleList extends Component {
	constructor( props ) {
		super( props );

		this.showPlanetInfo = this.getPlanetInfo.bind( this );
		this.onPopupDismiss = this.hidePopup.bind( this );
		this.fetchMorePeople = this.fetchPeople.bind( this );
	}

	getPlanetInfo( event ) {
		event.preventDefault();
		const planetLink = event.target.getAttribute( "href" );
		this.showPopUp( event.target.parentNode );
		const regex = /\/planets\/([0-9]+)/gi;
		let result = regex.exec( planetLink );

		this.props.togglePlanetInfo( result[ 1 ] );
	}

	showPopUp( parentNode ) {
		let popUpNode = document.createElement( 'div' );
		popUpNode.setAttribute( 'class', 'pop-up' );

		parentNode.appendChild( popUpNode );
	}

	hidePopup() {
		this.props.togglePlanetInfo();
	}

	fetchPeople() {
		if ( this.props.people.length < this.props.totalCount ) {
			this.props.fetchPeopleList( this.props.currentPage + 1 );
		}
	}

	componentWillMount() {
		this.tableColumns = [
			{
				Header: 'Name',
				accessor: 'name'
			},
			{
				Header: 'Height',
				accessor: 'height'
			},
			{
				Header: 'Mass',
				accessor: 'mass'
			},
			{
				Header: 'Created',
				accessor: 'created',
				Cell: createdAt => (
					<span>{moment( createdAt ).format( 'h:mma, Do MMM YYYY' )}</span>
				)
			},
			{
				Header: 'Edited',
				accessor: 'edited',
				Cell: editedAt => (
					<span>{moment( editedAt ).format( 'h:mma, Do MMM YYYY' )}</span>
				)
			},
			{
				Header: 'Planet',
				accessor: 'homeworld',
				Cell: planetLink => (
					<div>
						<a href={planetLink} onClick={this.showPlanetInfo}>Planet Link</a>
					</div>
				)
			},
		];
	}

	render() {
		let isPopupVisible = false;
		if ( this.props.planetIdToBeShown ) {
			isPopupVisible = true;
		}

		return (
			<div className={'peopleList'}>
				<Table columns={this.tableColumns} data={this.props.people}
					isDataLoading={this.props.loadListInProgress}
					fetchNextPage={this.fetchMorePeople} />

				<Popup visible={isPopupVisible}
					planetInfo={this.props.planetInfoToBeShown}
					onDismiss={this.onPopupDismiss} />
			</div>
		);
	}
}

function mapDispatchToProps( dispatch ) {
	return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
	return {
		people: state.people,
		totalCount: state.totalCount,
		currentPage: state.currentPage,
		planetIdToBeShown: state.planetIdToBeShown,
		planetInfoToBeShown: state.planets[ state.planetIdToBeShown ],
		loadListInProgress: state.loadListInProgress
	};
}

export default connect( mapStateToProps, mapDispatchToProps )( PeopleList );