# react+react-router+redux+koa2+mongoDB 个人博客

基于 ``react全家桶`` 和 ``koa2`` 搭建的个人博客

风格仿照 ECMAScript 6，项目基于前后端分离的思想，后端提供接口，前端调用

在线地址请点击这里： [在线地址](http://pengkid.com)

开源代码请点击这里： [github地址](https://github.com/pengkid/pengkid-blog) 

* 功能还有待完善。

## 命令使用

### 安装 && 运行

``` bash
$ cd pengkid-blog
$ npm install // src包安装

$ cd server
$ npm install // 后台包安装

$ node run // 启动后台
$ cd ../
$ npm run dev // 启动前端
```

#### 命令

``` bash
// 开发
$ npm run dev

// 打包
$ npm run build
```

## 技术栈

前端：
- react@15.3.1
- react-router@3.0.5
- redux@3.6.0
- webpack@1.13.2
- es6

后台：
- koa@2.0.0-alpha.8
- mongoose@4.11.1
- asyn/await

## 浏览器兼容

- Chrome
- Firefox
- Safari
- IE10+

## 简单介绍

redux-thunk配合fetch处理异步action的请求：
```js
// 获取所有文章id和title
export const getArticlesBySort = sort => {
    return dispatch => {
        const url = `${CONFIG.server}/api/getArts`;
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sort
            }),
            mode: 'cors'
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                dispatch({
                    type: GET_ARTICLES,
                    articles: data.articles,
                })
            })
    }
}
```

```js
// 获取所有文章action对应的reducer
case GET_ARTICLES:
    return Object.assign({}, defaultIssuesState, {
        isFetching: false,
        articles: action.articles,
    })
```

```js
//异步dispatch（action）的处理
componentDidMount() {
    const { dispatch } = this.props
    NProgress.start()
    dispatch(getArticles())
      .then(() => {
        const { _id } = this.props.articles[0]
        dispatch(getArticleById(_id))
          .then(() => {
            NProgress.done()
            this.setState({
              article: this.props.article
            })
          })
      })
  }
```

让nodejs支持es6，注意：nodejs支持async／await的话要8.0以上
```js
require('babel-core/register')
require('babel-polyfill')
require('./app')
```
