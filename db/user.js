const mongoose = require('./db');
const Schema = mongoose.Schema;


const userSchema = new Schema({
  email: String,
  name: String,
  password: String
})

const userModel = mongoose.model('User', userSchema);

// 查询用户以及保存用户
class Userdb {
  constructor () {
  }
// 查询
  query (obj = {}) {
     return new Promise((resolve, reject) => {
       userModel.find(obj, (err, res) => {
         if(err) {
           reject(err)
         }
         resolve(res)
       })
     })
  }
  queryEmail (em) {
   return new Promise((resolve, reject) => {
     userModel.find({email: em}, (err, res) => {
       if(err) {
         reject(err)
       }
       const len = res.length
       if(len >= 1){
         // 存在
         resolve(res)
       }else {
         // 不存在
         resolve(null)
       }
     })
   })
 }
  // 保存
  save (obj) {
     const m = new userModel(obj)
     return new Promise((resolve, reject)=> {
       m.save((err, res) => {
         if (err) {
           reject(err)
         }
         resolve(res)
         console.log(res)
       })
     })

  }
}
module.exports = new Userdb()












// ------------------
