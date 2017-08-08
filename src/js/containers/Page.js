// libs
import React from 'react';
import { connect } from 'react-redux';
import NProgress from 'nprogress';

// actions
import { getArticlesBySort, delArticleById } from '../actions/index.js';

// components
import Menu from '../components/Menu.js';


class Page extends React.Component {
    constructor(props) {
        super(props)
        this.state= {
            articles: []
        }
        this.delArticle = this.delArticle.bind(this);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        let sort = 'all';
        NProgress.start();
        dispatch(getArticlesBySort(sort))
            .then(() => {
                NProgress.done()
                this.setState({
                    articles: this.props.articles
                })
            })
    }

    delArticle(_id) {
        const { dispatch } = this.props;
        NProgress.start();
        dispatch(delArticleById(_id))
            .then(() => {
                NProgress.done()
                this.setState({
                    article: this.props.articles
                })
            })
    }

    render() {
        const { articles } = this.state;
        return (
            <Menu
                articles={articles}
                delArticleById={ (_id) => this.delArticle(_id) }
            />
        )
    }
}

const mapStateToProps = state => {
    const { 
        isFetching, 
        articles, 
    } = state || { 
        isFetching: true, 
        articles: []
    }
    return { isFetching, articles }
}

export default connect(mapStateToProps)(Page)