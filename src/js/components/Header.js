// libs
import React from 'react';

export default class Header extends React.Component {
    render() {
        return (
            <header className="mdl-layout__header mdl-layout__header--waterfall">
                <div aria-expanded="false" role="button" className="mdl-layout__drawer-button">
                    <i className="material-icons"></i>
                </div>
                <div aria-expanded="false" role="button" className="open-drawer-button">
                    <i className="material-icons"></i>
                </div>
                <div className="mdl-layout__header-row title-row">
                    <span className="mdl-layout-title" id="title">鹏仔的博客</span>
                    <div id="hitokoto" className="ready">
                        <span className="hito-text">越看越陶醉，人醉人憔悴。</span><br/>
                    </div>
                </div>
            </header>
        )
    }
}