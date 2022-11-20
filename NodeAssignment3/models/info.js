const Sequelize = require('sequelize');

module.exports = class Info extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            // 테이블 컬럼에 대한 설정
            {
              address: {
                type: Sequelize.STRING(100),
                allowNull: false,
                unique: true,
              },
              created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
              },
            },
            // 테이블 자체에 대한 설정
            {
              sequelize,
              timestamps: false,
              underscored: false,
              modelName: 'Info',
              tableName: 'infos',
              paranoid: false,
              charset: 'utf8',
              collate: 'utf8_general_ci',
            },
          );
    }

    static associate(db) {
        db.Info.belongsTo(db.User, { foreignKey: 'UserId', targetKey: 'id' });
        // db.Info.hasMany(db.Comment, { foreignKey: 'userId', sourceKey: 'id', onDelete: 'cascade' });
    }
};
