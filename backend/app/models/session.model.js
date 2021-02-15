module.exports = (sequelize, Sequelize) => {
    const Session = sequelize.define("session", {
        subject: {
            type: Sequelize.STRING
        },
        department: {
            type: Sequelize.STRING
        },
        type: {
            type: Sequelize.STRING
        },
        start: {
            type: Sequelize.STRING
        },
        finish: {
            type: Sequelize.STRING
        },
        venue: {
            type: Sequelize.STRING
        },

        published: {
            type: Sequelize.BOOLEAN
        }
    });

    return Session;
};