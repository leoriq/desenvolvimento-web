import Sequelize from "sequelize";
import databaseConfig from "../config/database";

import User from "../app/models/User";
import File from "../app/models/File";
import Ad from "../app/models/Ad";
import Comment from "../app/models/Comment";

const models = [User, File, Ad, Comment];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();
