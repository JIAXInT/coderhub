// 导入crypto模块
const crypto = require("crypto");

// 定义md5password函数，用于对输入的密码进行MD5加密处理
function md5password(password) {
  // 创建MD5哈希对象
  const md5 = crypto.createHash("md5");

  // 对密码进行MD5加密处理并以十六进制编码返回结果
  const md5pwd = md5.update(password).digest("hex");

  // 返回加密后的密码
  return md5pwd;
}

// 导出md5password函数
module.exports = md5password;
