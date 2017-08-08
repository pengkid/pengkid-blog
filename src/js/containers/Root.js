// libs
import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import NProgress from 'nprogress';

// components
import App from '../containers/App.js';

// stylesheets
import 'normalize.css';
import '../../css/article.scss';
import '../../css/nprogress.scss';
import '../../css/font.scss';
import '../../css/write.scss';
import '../../css/login.scss';

const Page = (next, cb) => {
    NProgress.start();
    require.ensure([], require => {
        cb(null, require('../containers/Page.js').default)
    }, 'page')
};

const Home = (next, cb) => {
    NProgress.start();
    require.ensure([], require => {
        cb(null, require('../components/catagory/Home.js').default)
    }, 'home')
};

const Edit = (next, cb) => {
    NProgress.start();
    require.ensure([], require => {
        cb(null, require('../components/catagory/Edit.js').default)
    }, 'edit')
};

const View_quilt = (next, cb) => {
    NProgress.start();
    require.ensure([], require => {
        cb(null, require('../components/catagory/View_quilt.js').default)
    }, 'view_quilt')
};

const Card_giftcard = (next, cb) => {
    NProgress.start();
    require.ensure([], require => {
        cb(null, require('../components/catagory/Card_giftcard.js').default)
    }, 'card_giftcard')
};

const Loyalty = (next, cb) => {
    NProgress.start();
    require.ensure([], require => {
        cb(null, require('../components/catagory/Loyalty.js').default)
    }, 'loyalty')
};

const Info = (next, cb) => {
    NProgress.start();
    require.ensure([], require => {
        cb(null, require('../components/catagory/Info.js').default)
    }, 'info')
};

const Article = (next, cb) => {
    NProgress.start();
    require.ensure([], require => {
        cb(null, require('../components/Article.js').default)
    }, 'article')
};

const Login = (next, cb) => {
    NProgress.start();
    require.ensure([], require => {
        cb(null, require('../components/Login.js').default)
    }, 'login')
};

const Write = (next, cb) => {
    NProgress.start();
    require.ensure([], require => {
        cb(null, require('../components/Write.js').default)
    }, 'write')
};

const routes = (
    <Route path="/" component={App}>
        <IndexRoute getComponent={Page} />
        <Route path="首页" getComponent={Home} />
        <Route path="学无止境" getComponent={Edit} />
        <Route path="杂七乱八" getComponent={View_quilt} />
        <Route path="资源分享" getComponent={Card_giftcard} />
        <Route path="标签云" getComponent={Loyalty} />
        <Route path="关于" getComponent={Info} />
        <Route path='article/:id' getComponent={Article} />
        <Route path="login" getComponent={Login} />
        <Route path="write/:id" getComponent={Write} />
    </Route>
);

export default class Root extends React.Component {
    render() {
        return <Router history={hashHistory} routes={routes} />
    }
}