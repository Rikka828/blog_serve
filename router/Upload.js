const router = require("express").Router()
const fs = require("fs")
const path = require("path")
const { db, genid } = require("../db/dbutils")

router.post("/rich_editor_upload", (req, res) => {
    if (!req.files) return res.send({
        "errno": 1, // 只要不等于 0 就行
        "message": "失败信息"
    })
    let backUrl = []
    req.files.forEach((item) => {
        let file_name = genid.NextId() + "." + item.originalname.substring(item.originalname.lastIndexOf(".") + 1)
        let oldurl = path.join(process.cwd(), "./public/upload/temp", item.filename)
        let newurl = path.join(process.cwd(), "./public/upload", file_name)
        fs.rename(oldurl, newurl, (err) => {
            if (err) return console.log(err);
        })
        backUrl.push(`http://127.0.0.1:3000/upload/${file_name}`)
    })

    return res.send({
        "errno": 0, // 注意：值是数字，不能是字符串
        "data": {
            "url": backUrl[0], // 图片 src ，必须
        }
    })

})

module.exports = router