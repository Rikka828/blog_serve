const router = require("express").Router()
const { db, genid } = require("../db/dbutils")
// 引入token验证中间件
const tokenVerify = require("../middlewares/tokenVerify")

// 添加接口
router.post("/add",tokenVerify, async (req, res) => {
    let { name } = req.body
    let id = genid.NextId()
    let { err } = await db.async.run("INSERT INTO `category` (`id`,`name`) VALUES (?,?)", [id, name])
    // 如果err有值 就是添加失败
    if (err) return res.send({
        code: 500,
        msg: "添加失败"
    })
    // 否则成功
    res.send({
        code: 200,
        msg: "添加成功"
    })

})
// 修改接口
router.put("/update",tokenVerify, async (req, res) => {
    let { id, name } = req.body
    let { err } = db.async.run("UPDATE `category` SET `name`=? WHERE `id` = ?", [name, id])
    // 如果err有值 就是添加失败
    if (err) return res.send({
        code: 500,
        msg: "修改失败"
    })
    // 否则成功
    res.send({
        code: 200,
        msg: "修改成功"
    })
})
// 删除接口
router.delete("/delete",tokenVerify, async (req, res) => {
    let { id } = req.body
    let { err } = db.async.run("DELETE FROM `category` WHERE `id`=?", [id])
    // 如果err有值 就是添加失败
    if (err) return res.send({
        code: 500,
        msg: "删除失败"
    })
    // 否则成功
    res.send({
        code: 200,
        msg: "删除成功"
    })
})
// 获取列表
router.get("/list",async(req,res)=>{
    let {err,rows} = await db.async.all("SELECT * FROM `category`",[])
        // 如果err有值 就是添加失败
        if (err) return res.send({
            code: 500,
            msg: "获取列表失败"
        })
        // 否则成功
        res.send({
            code: 200,
            msg: "获取列表成功",
            data:rows
        })
})

module.exports = router