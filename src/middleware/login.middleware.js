const jwt = require("jsonwebtoken");
const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_IS_ALREADY_EXISTED,
  NAME_IS_NOT_EXISTED,
  PASSWORD_IS_INCORRECT,
  UNAUTHORIZED,
} = require("../config/error");
const { PUBLIC_KEY } = require("../config/screct");
const userService = require("../service/user.service");
const md5password = require("../utils/md5password");

// 验证登录中间件
const verifyLogin = async (ctx, next) => {
  const { name, password } = ctx.request.body;

  // 1.判断用户名密码是否为空
  if (!name || !password) {
    return ctx.app.emit("error", NAME_OR_PASSWORD_IS_REQUIRED, ctx);
  }

  // 2. 查询用户是否存在
  const users = await userService.findUserByName(name);
  const user = users[0];
  if (!user) {
    return ctx.app.emit("error", NAME_IS_NOT_EXISTED, ctx);
  }

  // 3. 校验密码是否正确
  if (user.password !== md5password(password)) {
    return ctx.app.emit("error", PASSWORD_IS_INCORRECT, ctx);
  }

  // 4.将user信息保存到ctx
  ctx.user = user;

  await next();
};

// 验证token中间件
const verifyAuth = async (ctx, next) => {
  // 1.获取token
  const authorization = ctx.headers.authorization;
  if (!authorization) {
    return ctx.app.emit("error", UNAUTHORIZED, ctx);
  }
  const token = authorization.replace("Bearer ", "");

  // 2.验证token
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"],
    });

    // 保留token信息
    ctx.user = result;

    await next();
  } catch (error) {
    ctx.app.emit("error", UNAUTHORIZED, ctx);
  }
};

module.exports = {
  verifyLogin,
  verifyAuth,
};
