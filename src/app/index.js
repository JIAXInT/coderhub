const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const registerRoutes = require("../router");
// const userRouter = require("../router/user.router");
// const loginRouter = require("../router/login.router");

const app = new Koa();

app.use(bodyParser());

registerRoutes(app);
// app.use(userRouter.routes());
// app.use(userRouter.allowedMethods());
// app.use(loginRouter.routes());
// app.use(loginRouter.allowedMethods());

module.exports = app;
