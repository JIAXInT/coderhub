const coonection = require("../app/database");

class UserService {
  async create(user) {
    // 获取到用户user
    const { name, password } = user;

    // 拼接statement
    const statement = "INSERT INTO `user` (name,password) VALUES (?,?)";

    // 执行statement
    const [result] = await coonection.execute(statement, [name, password]);
    return result;
  }

  async findUserByName(name) {
    const statement = "SELECT * FROM `user` WHERE name = ?";
    const [values] = await coonection.execute(statement, [name]);
    return values;
  }
}

module.exports = new UserService();
