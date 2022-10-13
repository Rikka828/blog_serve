const router = require("express").Router()
const { db, genid } = require("../db/dbutils")
const { v4: uuidv4 } = require('uuid')

router.post("/login", async (req, res) => {
    const { account, password } = req.body
    const { err, rows } = await db.async.all("SELECT * FROM `admin` WHERE `account` = ? AND `password` = ?", [account, password])
    // 如果 err 有参数 或者 rows是一个为[]数组 返回失败
    if (err || rows.length === 0) return res.send({
        code: 500,
        msg: "登陆失败"
    })
    let token = uuidv4()
    await db.async.run("UPDATE `admin` SET `token`=? WHERE `id`=?", [token, rows[0].id])
    return res.send({
        code: 200,
        msg: "登陆成功",
        data: { token }
    })

})
router.post("/register", async (req, res) => {
    const { account, password } = req.body
    let id = uuidv4()
    const { err, rows } = await db.async.run("INSERT INTO `admin` (`id`,`account`,`password`) VALUES (?,?,?)", [id,account, password])
    if (err) return res.send({
        code: 500,
        msg: "注册失败"
    })
    return res.send({
        code: 200,
        msg: "注册成功",
    })

})
module.exports = router