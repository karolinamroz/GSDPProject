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


db.sessions.belongsToMany(db.participants, {
    through: "sessions_participants",
    as: "participants",
    foreignkey: "session_id",
});

db.participants.belongsToMany(db.sessions, {
    through: "sessions_participants",
    as: "sessions",
    foreignKey: "participant_id",
});

module.exports = db;