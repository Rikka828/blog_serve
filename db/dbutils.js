const path = require("path")
const sqlite3 = require('sqlite3').verbose();
const GenId = require("../utils/snowflake")
// 连接数据库
const db = new sqlite3.Database(path.join(__dirname, "blog.sqlite3"));
// 引入雪花id
const genid = new GenId({ WorkerId: 1 });

// 封装db为promise
db.async = {}
db.async.all = (sql,param) =>{
    return new Promise((resolve, reject) => {
        db.all(sql,param,(err,rows)=>{
            resolve({err,rows})
        })
    })
}
db.async.run = (sql,param) =>{
    return new Promise((resolve, reject) => {
        db.run(sql,param,(err,rows)=>{
            resolve({err,rows})
        })
    })
}

module.exports = { db, genid }