// libs
import React from 'react'
import marked from 'marked'
import { connect } from 'react-redux'
import NProgress from 'nprogress';

import { getArticlesBySort, getArticleById, delArticleById } from '../actions/index.js'

class Article extends React.Component {
    constructor(props) {
        super(props)
        this.state= {
            article: ''
        }
    }

    componentDidMount() {
        const { dispatch } = this.props;
        const _id = this.props.params.id;
        dispatch(getArticleById(_id))
            .then(() => {
                NProgress.done()
                this.setState({
                    article: this.props.article
                })
            })
    }

    render() {
        const { article } = this.state;
        return (
            <div id="content" className="article">
                <h1 className="article-title">{article && article.title}</h1>
                <p className="article-time">{article && article.create_time && article.create_time.substr(0, 10)}</p>
                {article && article.content &&
                <div className="article-desc article-content" 
                    dangerouslySetInnerHTML={{__html: marked(article.content)}}>
                </div>
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
  const { 
    isFetching, 
    article, 
    sort 
  } = state || { 
      isFetching: true, 
      sort: 'all' 
    }
  return { isFetching, article, sort }
}

export default connect(mapStateToProps)(Article)