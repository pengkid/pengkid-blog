import mongoose, { Schema } from 'mongoose'


/**
 * 1.连接数据库，并创建连接；
 * 2.定义Schema模式（相当于数据库建表） ；
 * 3.根据Schema创建（编译）模型（相当于构建对象和数据库表映射）；
 * 4.通过模块，创建对象
 * 5.通过save方法持久化对象；
 */

/**
 * 用户模式
 * @param {String} name 昵称
 * @param {String} password 密码
 * @param {String} create_time 创建日期
 * */
// 定义用户模式UserSchema
const UserSchema = new Schema({
  username: {
    type: String,
    index: true,
    required: true,
    trim: true
  },
  isAdmin: {
    type: String,
    default: 0
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  token: {
    type: String,
    trim: true
  }
})

const UserModel = mongoose.model('User', UserSchema, 'UserModel');
// 编译并输出用户模型
export default UserModel;

/*
* 分析上面的代码，发现在Schema中没有指定集合，而在模型的定义中也没有指定集合，那么新建的文档将要插入到哪里呢？
* 在MongoDB中，如果向一个不存在的集合中插入文档，则对应的数据库会创建一个集合，Mongoose同样遵循这个原则，
* 并且在新创建的数据库的命名上面也颇有讲究
* 判断模型名是否可数，如果不可数直接返回模型名作为新集合的名称；如果可数，则返回模型名的复数形式作为新集合的名称（模型名+'s') ;
*/