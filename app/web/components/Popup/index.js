import React, { Component } from 'react';

const _ = require( 'lodash' );

import Styles from './styles.css';

class Popup extends Component {
	componentWillMount() {
		this.infoToBeShown = [ "Name", "Diameter", "Climate", "Population" ];
	}

	render() {
		let classList = [ "popup" ];
		if ( this.props.visible ) {
			classList.push( "visible" );
		}

		let content;
		if ( this.props.planetInfo && !_.isEmpty( this.props.planetInfo ) ) {
			let infoLabels = [];
			let infoValues = [];
			this.infoToBeShown.forEach( propertyName => {
				let baseKey = "info_" + this.props.planetInfo.id + "_" + propertyName;

				infoLabels.push(
					<div key={( baseKey + "_label" )} className={'label'}>{propertyName}</div>
				);

				let valueToShow = this.props.planetInfo[ propertyName.toLowerCase() ];
				if ( propertyName.toLowerCase() == "population" ) {
					valueToShow = valueToShow.toString().replace( /\B(?=(\d{3})+(?!\d))/g, "," );
				}

				infoValues.push(
					<div key={( baseKey + "_value" )} className={'value'}>{valueToShow}</div>
				);
			} );

			content = (
				<div className={'info-wrapper'}>
					<div className={'info-labels-wrapper'}>
						{infoLabels}
					</div>

					<div className={'info-values-wrapper'}>
						{infoValues}
					</div>
				</div>
			);
		} else {
			content = (
				<div>Loading...</div>
			);
		}

		return (
			<div className={classList.join( " " )} onClick={this.props.onDismiss}>
				{content}
			</div>
		);
	}
}

export default Popup;