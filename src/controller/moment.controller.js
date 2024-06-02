const { off } = require("../app/database");
const momentService = require("../service/moment.service");

class MomentController {
  async create(ctx, next) {
    // 1.获取发表的内容
    const { content } = ctx.request.body;

    // 2.动态由谁发布（token）
    const { id } = ctx.user;

    // 3.将动态保存到数据库
    const resuslt = await momentService.create(content, id);

    ctx.body = {
      code: 0,
      message: "发布成功",
      data: resuslt,
    };
  }

  async list(ctx, next) {
    const { offset, size } = ctx.query;

    const result = await momentService.queryList(offset, size);

    ctx.body = {
      code: 0,
      message: "获取动态列表成功",
      data: result,
    };
  }

  async detail(ctx, next) {
    const { momentId } = ctx.params;

    // 根据id查询动态详情
    const result = await momentService.queryById(momentId);

    ctx.body = {
      code: 0,
      data: result,
    };
  }

  async remove(ctx, next) {
    const { momentId } = ctx.params;

    // 数据库操作
    const result = await momentService.remove(momentId);
    ctx.body = {
      code: 0,
      message: "删除成功",
      data: result,
    };
  }

  async update(ctx, next) {
    const { momentId } = ctx.params;

    // 修改的内容
    const { content } = ctx.request.body;

    // 数据库操作
    const result = await momentService.update(content, momentId);
    ctx.body = {
      code: 0,
      message: "修改成功",
      data: result,
    };
  }
}

module.exports = new MomentController();
