import UserModel from '../db/schema/user';
import ArticleModel from '../db/schema/article';
import jwt from 'jsonwebtoken';

export default function(Router) {
  const router = new Router({
    prefix: '/api'
  })

  // 登陆
  router.post(
    '/login', 
    async (ctx, next) => {
      const { username, password } = ctx.request.body
      const user = await UserModel.findOne({ username }).exec()
      if(!user) {
        ctx.body = { status: 0, msg: '用户不存在' }
      } else {
        if(user.password !== password) {
          ctx.body = { status: 0, msg: '密码不正确' }
        } else {
          const token = jwt.sign({name: user.username}, 'secret', {
            expiresIn: 60*60  // token到期时间设置
          })
          user.token = token
          await user.save()
          ctx.body = { status: 1, msg: '登陆验证成功', token, username }
        }
      }
    }
  )

  // token 验证
  router.post(
    '/valid',
    async(ctx, next) => {
      const { token } = ctx.request.body
      try {
        const decoded = jwt.verify(token, 'secret')
        // 过期
        if (decoded.exp <= Date.now()/1000 ) {
          ctx.body = {
            status: 0,
            msg: '登录状态已过期，请重新登录'
          }
          return
        }
        if (decoded) {
          // token is ok
          ctx.body = {
            status: 1,
            msg: '登陆验证成功'
          };
          return;
        }
      } catch(e) {
        if(e) {
          ctx.body = {
            status: 0,
            msg: e.message
          } 
        }
      }  
    }
  )

  // 发文章
  router.post(
    '/post', 
    async (ctx, next) => {
      const { _id, create_time, sort, infos, title, content, tags, token } = ctx.request.body
      try {
        const decoded = jwt.verify(token, 'secret')
        // 不是admin，没有发文章的权限
        if(decoded.name === 'pengkid') {
          try {
            const article = await ArticleModel.findOne({ _id }).exec()
            if(article) {
              article.sort = sort;
              article.infos = infos;
              article.title = title;
              article.content = content;
              article.tags = tags;
              await article.save()
              ctx.body = { 
                status: 1, 
                msg: '更新成功' 
              }
            } else {
              await ArticleModel({ infos, title, sort, content, tags, create_time }).save()
              ctx.body = { status: 1, msg: '成功发布' }
            }
          } catch(e) {
            await ArticleModel({ infos, title, sort, content, tags, create_time  }).save()
            ctx.body = { status: 1, msg: '成功发布' }
          } 
        } else {
          ctx.body = { status: 0, msg: '你没有该权限' }
        }
      } catch(e) {
        ctx.body = { status: 0, msg: e.message }
      }
    }
  )

  // 根据分类获取文章标题，id
  router.post(
    '/getArts',
    async (ctx, next) => {
      const { sort } = ctx.request.body
      if(sort === 'all' ||  sort === '首页' || sort === 'undefined') {
        const articles = await ArticleModel.find({'sort': { '$ne': 'visitor' }}, ['_id', 'title', 'infos' ,'sort', 'tags'])
        ctx.body = { status: 1, msg: '成功获取', articles }
      } else {
        const articles = await ArticleModel.find({ sort }, ['_id', 'title', 'infos', 'sort', 'tags'])
        ctx.body = { status: 1, msg: '成功获取', articles }
      }
    }
  )

  // 获取文章详情
  router.post(
    '/getArtById',
    async (ctx, next) => {
      const { _id } = ctx.request.body
      try {
        const article = await ArticleModel.findOne({ _id }).exec()
        if(article) {
          article.views = article.views + 1
          await article.save()
          ctx.body = { status: 1, msg: '成功获取', article }
        } else {
          ctx.body = { status: 0, msg: '文章不存在', article }
        }
      } catch(e) {
        ctx.body = { 
          status: 0, 
          msg: e.message, 
          article: { 
            title: '这里输入标题', 
            content: '这里写 markdown 文本'
          } 
        }
      }
    }
  )

  // 删除文章
  router.post(
    '/delArtById',
    async (ctx, next) => {
      const { _id, token } = ctx.request.body
      try {
        const decoded = jwt.verify(token, 'secret')
        // 不是admin，没权限
        if(decoded.name !== 'pengkid') {
          ctx.body = { status: 0, msg: '你没有该权限' }
          return 
        }
        await ArticleModel.remove({ _id })
        const articles = await ArticleModel.find({}, ['_id', 'title', 'infos' ,'sort', 'tags'])
        ctx.body = { status: 1, msg: '成功删除', articles }
      } catch(e) {
        ctx.body = { status: 0, msg: e.message }
      }
    }
  )
  return router.routes()
}
