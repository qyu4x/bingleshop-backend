'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Chat extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Chat.belongsTo(models.User, {
                foreignKey: 'user_id_sender',
                as: 'sender'
            })

            Chat.belongsTo(models.User, {
                foreignKey: 'user_id_recipient',
                as: 'recipient'
            })
        }
    }

    Chat.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        user_id_sender: DataTypes.UUID,
        user_id_recipient: DataTypes.UUID,
        message: DataTypes.TEXT,
        read_at: DataTypes.BIGINT,
        created_at: DataTypes.BIGINT,
        updated_at: DataTypes.BIGINT,
    }, {
        sequelize,
        modelName: 'Chat',
        tableName: 'chats',
        underscored: true,
        timestamps: false
    });
    return Chat;
};