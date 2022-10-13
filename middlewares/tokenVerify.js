const { db, genid } = require("../db/dbutils")
const tokenVerify = async (req, res, next) => {
    if(!req.headers.token) return res.send({
        code:400,
        msg:"请登录"
    })
    let { err, rows } = await db.async.all("SELECT * FROM `admin` WHERE `token`=? ", [req.headers.token])
    // 如果err有值或者rows无值
    if(err || !(rows.length)){
        return  res.send({
            code:400,
            msg:"token不对,请重新登录"
        })
    }
    // 有token 并且 对上了
    next()
}

module.exports = tokenVerify