const { OPERATION_IS_NOT_ALLOWED } = require("../config/error");
const permissionService = require("../service/permission.service");

const verifyPermission = async (ctx, next) => {
  // 获取登录用户的id
  const { id } = ctx.user;

  // 获取资源的id
  const keyName = Object.keys(ctx.params)[0];
  const resourceId = ctx.params[keyName];
  const resourceName = keyName.replace("Id", "");

  // 查询user的id是否有权限修改momentId的动态
  const isPermission = await permissionService.checkReouce(
    resourceName,
    resourceId,
    id
  );
  if (!isPermission) {
    return ctx.app.emit("error", OPERATION_IS_NOT_ALLOWED, ctx);
  }

  await next();
};

module.exports = {
  verifyPermission,
};
