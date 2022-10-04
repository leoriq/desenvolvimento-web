import Sequelize, { Model } from "sequelize";

class Ad extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                description: Sequelize.STRING,
                ingredients: Sequelize.STRING,
                image_id: Sequelize.INTEGER,
                value: Sequelize.FLOAT,
            },
            {
                sequelize,
            }
        );

        return this;
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id', onDelete: 'CASCADE' })
        this.belongsTo(models.File, { foreignKey: 'image_id', onDelete: 'SET NULL' })
    }
}

export default Ad;