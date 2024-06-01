const userService = require("../service/user.service");

class userController {
  async create(ctx, next) {
    // 获取用户传递的信息
    const user = ctx.request.body;

    // 将user的信息存储到数据库中
    const result = await userService.create(user);

    // 查看结果，告知前端注册成功
    ctx.body = {
      message: "注册成功",
      data: result,
    };
  }
}

module.exports = new userController();
