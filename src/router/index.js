const fs = require("fs");

function registerRoutes(app) {
  // 读取当前文件夹下所有的文件
  const files = fs.readdirSync(__dirname);

  // 遍历所有文件
  for (const file of files) {
    if (!file.endsWith(".router.js")) continue;
    const router = require(`./${file}`);
    app.use(router.routes());
    app.use(router.allowedMethods());
  }

  console.log(files);
}

module.exports = registerRoutes;
