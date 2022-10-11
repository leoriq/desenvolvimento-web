module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("comments", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: "users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        allowNull: true, 
      },
      ad_id: {
        type: Sequelize.INTEGER,
        references: { model: "ads", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        allowNull: true, 
      },
      content: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable("comments");
  },
};
