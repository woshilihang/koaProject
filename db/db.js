const mongoose = require('mongoose')
const DB_URL = 'mongodb://localhost:27017/demo'

// 链接mongodb数据库
mongoose.connect(DB_URL);

mongoose.connection.on('connected', function() {
  console.log('Mongoose connections open to ' + DB_URL);
});

/**
*  链接异常error数据连接错误
*/

mongoose.connection.on('error',function(err) {
  console.log('Mongoose connection error: '+ err);
});
/**
* 连接断开 disconnected 连接异常断开
*/
mongoose.connection.on('disconnected',function() {
  console.log('Mongoose connection disconnected');
});

module.exports = mongoose
