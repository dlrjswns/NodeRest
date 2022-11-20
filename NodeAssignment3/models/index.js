const Sequelize = require('sequelize');
const User = require('./user');
const Info = require('./info');


const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env]; // development의 데이터베이스 아이디 비번과 같은 정보를 가져오겠군
const db = {};

const sequelize = new Sequelize(
    config.database, config.username, config.password, config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;
db.Info = Info;

User.init(sequelize);
Info.init(sequelize);

User.associate(db);
Info.associate(db);

module.exports = db;


