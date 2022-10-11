import Sequelize, { Model } from "sequelize";

class Comment extends Model {
    static init(sequelize) {
        super.init(
            {
                content: Sequelize.STRING,
            },
            {
                sequelize,
            }
        );

        return this;
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
        this.belongsTo(models.File, { foreignKey: 'ad_id', as: 'ad' });
    }
}

export default Comment;