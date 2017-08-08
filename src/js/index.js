// libs
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

// store
import configureStore from './store/configureStore.js';

// component
import Root from './containers/Root.js';

let store = configureStore();

render(
    <Provider store={store}>
        <Root />
    </Provider>,
    document.getElementById('container')
)