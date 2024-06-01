const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_IS_ALREADY_EXISTED,
} = require("../config/error");
const userService = require("../service/user.service");
const md5password = require("../utils/md5password");

const verifyUser = async (ctx, next) => {
  // 验证客户端传递的user是否可以保存的数据库中
  // 1. 验证用户名是否为空
  const { name, password } = ctx.request.body;
  if (!name || !password) {
    return ctx.app.emit("error", NAME_OR_PASSWORD_IS_REQUIRED, ctx);
  }

  // 2.判断name是否已经存在
  const users = await userService.findUserByName(name);
  if (users.length > 0) {
    return ctx.app.emit("error", NAME_IS_ALREADY_EXISTED, ctx);
  }

  // 3.执行下一个中间件
  await next();
};

const handlePassword = async (ctx, next) => {
  // 1.取出密码
  const { password } = ctx.request.body;

  // 2.加密密码
  ctx.request.body.password = md5password(password);

  await next();
};

module.exports = {
  verifyUser,
  handlePassword,
};
