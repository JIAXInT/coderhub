const KoaRouter = require("@koa/router");
const { verifyAuth } = require("../middleware/login.middleware");
const {
  create,
  list,
  detail,
  update,
  remove,
} = require("../controller/moment.controller");
const {
  verifyMomentPermission,
  verifyPermission,
} = require("../middleware/permission.middleware");

const momentRouter = new KoaRouter({ prefix: "/moment" });

// 增加动态
momentRouter.post("/", verifyAuth, create);
// 查询动态
momentRouter.get("/", list);
momentRouter.get("/:momentId", detail);
// 删除动态
momentRouter.delete("/:momentId", verifyAuth, verifyPermission, remove);
// 修改动态
momentRouter.patch("/:momentId", verifyAuth, verifyPermission, update);

module.exports = momentRouter;
