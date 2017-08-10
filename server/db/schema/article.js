import mongoose, { Schema } from 'mongoose'

const ArticleSchema = new Schema({
  sort: String,
  title: String,
  infos: String,
  content: String,
  views: {
    type: Number,
    default: 0
  },
  tags: Arrays,
  create_time: {
    type: Date,
    default: new Date()
  }
})

const ArticleModel = mongoose.model('Post', ArticleSchema, 'ArticleModel');

export default ArticleModel;
