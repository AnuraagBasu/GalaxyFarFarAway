import React, { Component } from 'react';
import { Provider } from 'react-redux';

import store from '../core/store';
import Root from './containers/Root';

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Root />
            </Provider>
        );
    }
}