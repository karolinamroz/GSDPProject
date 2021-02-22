const db = require("../models");
const Session = db.sessions;
const Participant = db.participants;

const Op = db.Sequelize.Op;

exports.addParticipants = (req, res) => {
    Session.findAll({
          
    })
    .then (participant => {
        Participant.create({
            
        })
    })
}