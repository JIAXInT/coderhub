const app = require("../app");
const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_IS_ALREADY_EXISTED,
  NAME_IS_NOT_EXISTED,
  PASSWORD_IS_INCORRECT,
  UNAUTHORIZED,
} = require("../config/error");

app.on("error", (error, ctx) => {
  let code = 0;
  let message = "";

  switch (error) {
    case NAME_OR_PASSWORD_IS_REQUIRED:
      code = -1001;
      message = "用户名或密码不能为空";
      break;
    case NAME_IS_ALREADY_EXISTED:
      code = -1002;
      message = "用户名已存在";
      break;
    case NAME_IS_NOT_EXISTED:
      code = -1003;
      message = "用户名不存在";
      break;
    case PASSWORD_IS_INCORRECT:
      code = -1004;
      message = "密码错误";
      break;
    case UNAUTHORIZED:
      code = -1005;
      message = "无效的token或token已过期";
      break;
  }

  ctx.body = {
    code,
    message,
  };
});
