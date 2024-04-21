// 导入express模块
const express = require("express");
// 创建express服务器
const app = express();
const bodyParser = require("body-parser");
////导入用于将客户端发送过来的JWT字符串解析还原成JSON对象的包
const expressJWT = require("express-jwt");
const config = require("./config");
// 导入并配置cors中间件，配置跨域
const cors = require("cors");

const logger = require("./utils");
app.use(cors());

// 跨域请求处理
app.all("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header(
    "Access-Control-Allow-Headers",
    "`Content`-Type, Content-Length, Authorization, Accept, X-Requested-With, X_Requested_With"
  );
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  //允许接收的请求头上加上一个Authorization，这样我们才能够将数据发送过去
  res.header("X-Powered-By", "3.2.1");

  // OPTIONS类型的请求 复杂请求的预请求
  if (req.method == "OPTIONS") {
    res.send(200);
  } else {
    /*让options请求快速返回*/
    next();
  }
});
// 一定要在路由之前，封装 res.cc 函数
app.use((req, res, next) => {
  // code 默认值为 500，表示失败的情况
  // err 的值，可能是一个错误对象，也可能是一个错误的描述字符串
  res.cc = function (err, code = 1) {
    res.send({
      code,
      message: err instanceof Error ? err.message : err
    });
  };
  next();
});

// 封装错误函数的中间件(放在模块路由前)
app.use((req, res, next) => {
  // status：1表示错误情况
  res.lose = (err, status = 1) => {
    res.send({
      status,
      message: err instanceof Error ? err.message : err
    });
  };
  next();
});

// 公开静态文件夹，匹配`虚拟路径img` 到 `真实路径public` 注意这里  /img/ 前后必须都要有斜杠！！！
app.use("/img/", express.static("./public/"));

// 挂载处理post请求的插件
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 配置解析表单数据的中间件
app.use(express.urlencoded({ extended: false }));

// 通过 express.json() 这个中间件，解析表单中的 JSON 格式的数据
app.use(express.json());

app.use(
  expressJWT({ secret: config.jwtSecretKey }).unless({
    path: [/^\/api\/user/, /^\/img/]
  })
);

//捕获错误的全局中间件
app.use(function (err, req, res, next) {
  //token过期
  if (err.status == 401) {
    res.status(401).send({ status: "fail" });
    return;
  }
  if (err) {
    res.status(500).send({ status: "fail" });
  }
});

app.logger = logger.log;


// 导入并使用首页路由模块
const userRouter = require("./router/user");
app.use("/api/user", userRouter);

const uploadController = require("./router/upload");
app.use("/api/upload", uploadController.upload);
app.use("/api/upload/delete", uploadController.deleteImg);

// 导入并使用首页路由模块
// const homeRouter = require('./router/home')
// app.use('/home',homeRouter)

// // 导入并使用社区图片路由模块
// const picsRouter = require('./router/pics')
// app.use('/pics',picsRouter)

// // 导入并使用资讯路由模块
// const newsRouter = require('./router/news')
// app.use('/news',newsRouter)

const customerRouter = require("./router/customer");
app.use("/api/customer", customerRouter);

const serviceRouter = require("./router_handler/service");
app.use("/api/service/edit", serviceRouter.submit);
app.use("/api/service/detail", serviceRouter.detail);
app.use("/api/preinstall/edit", serviceRouter.editPreinstall);
app.use("/api/preinstall/detail", serviceRouter.getPreinstall);

// 配置服务器
const port = 3006;
// const host = '127.0.0.1'
const host = "127.0.0.1";
app.listen(3006, () => {
  console.log(`api serve running at http://${host}:${port}`);
});
