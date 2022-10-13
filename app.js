const express = require("express")
const multer = require("multer")
const path = require("path")
const cors = require("cors")
// 引入token验证中间件
const tokenVerify = require("./middlewares/tokenVerify")

// 创建app实例
const app = express()
const port = 3000

// 开放跨域请求
app.use(cors())
// 接受json格式数据
app.use(express.json())
// 接收文件中间件

// 静态资源
app.use(express.static(path.join(__dirname, "./public")))

// admin路由
app.use("/admin", require("./router/Admin"))
// category路由
app.use("/category", require("./router/Category"))
// blog路由
app.use("/blog", require("./router/Blog"))
// 上传路由
app.use("/upload", tokenVerify, multer({ dest: "./public/upload/temp" }).any(), require("./router/Upload"))

app.listen(port, () => {
    console.log("server running at http://127.0.0.1:3000");
})