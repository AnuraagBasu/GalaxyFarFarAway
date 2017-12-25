import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ActionCreators } from '../../../core/actions';

import PeopleList from '../PeopleList';

import Styles from './styles.css';

class Root extends Component {
	constructor( props ) {
		super( props );
	}

	componentWillMount() {
		this.props.fetchPeopleList();
	}

	render() {
		return (
			<div>
				<div className={'pageTitle'}>In The Galaxy Far, Far Away</div>

				<PeopleList />
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
		planets: state.planets
	};
}

export default connect( mapStateToProps, mapDispatchToProps )( Root );