module.exports = (sequelize, Sequelize) => {
    const Participant = sequelize.define("participant", {
        name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        phone: {
            type: Sequelize.STRING
        }
    });

    return Participant;
};