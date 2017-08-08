import mongoose, { Schema } from 'mongoose'

/**
 * 文章模型
 * @param {String} title 标题
 * @param {String} content 内容
 * @param {Number} views 被浏览次数
 * @param {Object} author 作者
 * @param {Array} comments 评论
 * @param {Date} create_time 创建日期
 * */

const ArticleSchema = new Schema({
  sort: String,
  title: String,
  content: String,
  views: {
    type: Number,
    default: 0
  },
  author: {
    name: ''
  },
  create_time: {
    type: Date,
    default: new Date()
  }
})

const ArticleModel = mongoose.model('Post', ArticleSchema, 'ArticleModel');

export default ArticleModel;
