import React from 'react'
import marked from 'marked'
import NProgress from 'nprogress'
import fetch from 'isomorphic-fetch'
import { useRouterHistory } from 'react-router'
import { createHashHistory } from 'history'
import { connect } from 'react-redux'
import { getArticlesBySort, getArticleById, sendArticle, sendArticleByVisitor } from '../actions/index.js'
import { CONFIG } from '../constants/Config.js'
import { verifyJWT } from '../constants/Verify.js'

const appHistory = useRouterHistory(createHashHistory)()

class Write extends React.Component {
  constructor() {
    super()
    this.state = {
      write : 'markdown',
      height: '100px'
    }
  }

  componentDidMount() {
    // 登陆验证（添加游客留言功能后该验证取消）
    // verifyJWT()
    const { dispatch } = this.props
    const { id } = this.props.params
    // 得到当前文章信息
    dispatch(getArticleById(id))
      .then(() => {
        document.querySelector('.title').value = this.props.article.title
        document.querySelector('#sort') && (document.querySelector('#sort').value = this.props.article.sort)
        this.setState({ 
          height: window.innerHeight||document.body.clientHeight||document.documentElement.clientHeight,
          write: this.props.article.content
        })
        NProgress.done()
      })
  }

  handleWriteChange(event) {
    this.setState({ write: event.target.value })
  }

  sendArticle() {
    let sort, tags;
    const _id = this.props.params.id,
          title = document.querySelector('.title').value,
          infos = document.querySelector('.infos').value,
          content = this.state.write,
          token = sessionStorage.getItem('__token__')
    if(sessionStorage.getItem('__token__') && sessionStorage.getItem('__username__') === 'pengkid') {
      // 管理员发文章
      sort = document.querySelector('#sort').value;
      tags = document.querySelector('#tags').value;
      sendArticle(_id, sort, infos, title, content, tags, token)
        .then(() => {
          appHistory.push(`/?id=${_id}`)
        }) 
    }
   
  }

  render() {
    return (
      <div id="write">
        <div className="left" style={{ height: this.state.height }}>
          
          <input  
            type="text"
            className="title"
          />

          <input  
            type="text"
            className="infos"
          />

          {(sessionStorage.getItem('__token__') && sessionStorage.getItem('__username__') === 'pengkid') &&
            <select name="sort" id="sort" className="sort">
              <option value="学无止境">学无止境</option>
              <option value="杂七乱八">杂七乱八</option>
              <option value="资源分享">资源分享</option>
            </select>
          }

          <select name="tags" id="tags" className="sort" style={{right: '100px'}}>
            <option value="JavaScript">JavaScript</option>
            <option value="HTML">HTML</option>
            <option value="CSS">CSS</option>
            <option value="Git">Git</option>
            <option value="随笔">随笔</option>
            <option value="ES6">ES6</option>
            <option value="React">React</option>
            <option value="数据结构">数据结构</option>
            <option value="算法">算法</option>
            <option value="HTTP">HTTP</option>
            <option value="资源">资源</option>
          </select>

          <textarea 
            spellCheck="false"
            rows="10"
            onChange={ (e) => this.handleWriteChange(e) } 
            value={this.state.write}
          ></textarea>

          <button 
            className="send-btn"
            onClick={ () => this.sendArticle() }
          >
            发布
          </button>

        </div>
        <div className="right">
          <div 
            className="right-article article-desc article-content" 
            dangerouslySetInnerHTML={{ __html: marked(this.state.write) }}
            style={{ height: this.state.height }}
          >
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { article } = state || { article: {} }
  return { article }
}

export default connect(mapStateToProps)(Write)