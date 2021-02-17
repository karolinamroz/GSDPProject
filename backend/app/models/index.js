const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.sessions = require("./session.model.js")(sequelize, Sequelize);
db.participants = require("./participant.model.js")(sequelize, Sequelize);
//db.user = require("./user.model.js")(sequelize, Sequelize);
//db.role = require("./role.model.js")(sequelize, Sequelize);
/*
db.sessions.belongsToMany(db.participants, {
    through: "sessions_participants",
    as: "sessions",
    foreignkey: "session_id",
});

db.participants.belongsToMany(db.sessions, {
    through: "sessions_participants",
    as: "participants",
    foreignKey: "participant_id",
});

db.role.belongToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
});

db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
});
*/
//db.ROLES = ["user", "admin", "moderator"];

module.exports = db;