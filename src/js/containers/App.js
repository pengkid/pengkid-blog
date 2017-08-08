// libs
import React from 'react';

// components
import Header from '../components/Header.js';
import Aside from '../components/Aside.js';
import Page from './Page.js';

export default class App extends React.Component {
    render() {
        return (
            <div id="app" className="main-container mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header has-drawer is-upgraded">
                <Header />
                <Aside />
                <main className="mdl-layout__content">
                     {this.props.children}
                </main>
            </div>
        )
    }
}