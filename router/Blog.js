const router = require("express").Router()
const { db, genid } = require("../db/dbutils")
// 引入token验证中间件
const tokenVerify = require("../middlewares/tokenVerify")

// 添加博客
router.post("/add", tokenVerify, async (req, res) => {
    // 获取数据和制作数据
    let { title, content, category_id } = req.body
    let id = genid.NextId()
    let create_time = new Date().getTime()
    // 定义添加语句
    let insert_sql = "INSERT INTO `blog` (`id`,`category_id`,`title`,`content`,`create_time`) VALUES (?,?,?,?,?)"
    let insert_arr = [id, category_id, title, content, create_time]
    let { err, rows } = await db.async.run(insert_sql, insert_arr)
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
// 编辑博客
router.put("/update", tokenVerify, async (req, res) => {
    // 获取数据和制作数据
    let { id, title, content, category_id } = req.body
    // 定义添加语句
    let update_sql = "UPDATE `blog` SET `title`=?,`content`=?,`category_id`=? WHERE `id` = ?"
    let update_arr = [title, content, category_id, id]
    let { err, rows } = await db.async.run(update_sql, update_arr)
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
// 删除博客
router.delete("/delete", tokenVerify, async (req, res) => {
    let { id } = req.body
    let { err } = db.async.run("DELETE FROM `blog` WHERE `id`=?", [id])
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
// 获取博客列表
router.get("/list", async (req, res) => {
    let { keyword, categoryid, page, pageSize } = req.query
    // 定义默认值
    page = page ? page : 1
    pageSize = pageSize ? pageSize : 10
    // 定义查询语句
    let where_arr = []
    let param_arr = []
    // 如果有keyword
    if (keyword) {
        where_arr.push(" (`title` LIKE ? OR `content` LIKE ?) ")
        param_arr.push(`%${keyword}%`, `%${keyword}%`)
    }
    // 如果有categoryid
    if (categoryid) {
        where_arr.push(" `category_id` = ? ")
        param_arr.push(categoryid)
    }
    // 拼和字符串
    let where_str = where_arr.length ? "WHERE" + where_arr.join("AND") : ""
    let insert_sql = "SELECT `id`,`category_id`,`title`,substr(`content`,0,50) AS `content`,`create_time` FROM `blog` " + where_str + "ORDER BY `create_time` DESC LIMIT ?,?"
    // 1.获取总数
    let countResult = await db.async.all("SELECT count(*) FROM `blog` " + where_str, param_arr)
    // param_arr连接limit
    param_arr.push((page - 1) * pageSize, pageSize)
    // 2.搜索结果
    let searchResult = await db.async.all(insert_sql, param_arr)

    // 如果searchResult和countResult 一个有错误 就报错
    if (searchResult.err || countResult.err) return res.send({
        code: 400,
        msg: "获取数据失败"
    })
    res.send({
        code: 200,
        msg: "获取数据成功",
        data: {
            keyword,
            categoryid,
            page,
            pageSize,
            rows: searchResult.rows,
            count: countResult.rows[0]["count(*)"]
        }
    })
})
// 获取博客列表详情
router.get("/detail", async (req, res) => {
    let { id } = req.query
    let {err,rows} = await db.async.all("SELECT * FROM `blog` WHERE `id` = ?",[id])
    if(err){
        return res.send({
            code:400,
            msg:"获取失败",
        })
    }
    res.send({
        code:200,
        msg:"获取成功",
        rows
    })
})
module.exports = router