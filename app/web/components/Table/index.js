import React, { Component } from 'react';
import PropTypes from 'prop-types';

const _ = require( 'lodash' );

import Styles from './styles.css';

class Table extends Component {
	constructor( props ) {
		super( props );

		this.lastScrollTop = 0;
	}

	onScroll( event ) {
		let eventTarget = event.target;
		if ( eventTarget.scrollTop > this.lastScrollTop ) {
			if ( ( eventTarget.scrollTop + eventTarget.clientHeight ) == ( eventTarget.scrollHeight ) ) {
				this.props.fetchNextPage();
			}

			this.lastScrollTop = eventTarget.scrollTop;
		}
	}

	componentWillMount() {
		this.headers = this.props.columns.map( column => {
			let cellClassList = [ "cell" ];
			cellClassList.push( 'cell-' + column.accessor );

			return (
				<div className={cellClassList.join( " " )}>
					{column.Header}
				</div>
			);
		} );
	}

	render() {
		let headers = [];
		let bodyRows = [];

		this.props.data.forEach( rowData => {
			let rowCells = [];

			this.props.columns.forEach( column => {
				const cellValue = rowData[ column.accessor ];
				let cellValueToBeDisplayed;

				if ( column.Cell ) {
					cellValueToBeDisplayed = (
						<span>
							{column.Cell( cellValue )}
						</span>
					);
				} else {
					let classList = [ "value-text" ];
					if ( cellValue && ( cellValue == 'unknown' ) ) {
						classList.push( "value-text-red" );
					}

					cellValueToBeDisplayed = (
						<span className={classList.join( " " )}>{cellValue}</span>
					);
				}

				let cellClassList = [ "cell" ];
				cellClassList.push( 'cell-' + column.accessor );

				rowCells.push(
					<div className={cellClassList.join( " " )}>
						{cellValueToBeDisplayed}
					</div>
				);
			} );

			bodyRows.push(
				<div className={'row'}>{rowCells}</div>
			);
		} );


		let loaderClassList = [ "loader" ];
		if ( this.props.isDataLoading ) {
			loaderClassList.push( "show" );
		}

		return (
			<div className={'table'}>
				<div className={'header'}>
					<div className={'row'}>
						{this.headers}
					</div>
				</div>

				<div className={'body'} onScroll={this.onScroll.bind( this )}>
					{bodyRows}
				</div>

				<div className={loaderClassList.join( " " )}>Loading...</div>
			</div>
		);
	}
}

Table.propTypes = {
	columns: PropTypes.arrayOf( PropTypes.object ).isRequired,
	data: PropTypes.arrayOf( PropTypes.object ).isRequired
};

export default Table;