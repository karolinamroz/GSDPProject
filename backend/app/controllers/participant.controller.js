const db = require("../models");
const Participant = db.participants;
const Op = db.Sequelize.Op;
const Session = db.sessions;


exports.create = (req, res) => {
    if(!req.body.subject) {
            res.status(400).send({
                message: "Content cannot be empty!"
            });
            return;
        }
    const participant = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
    };

    Participant.create(participant)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Error occured while creating the participant."
        });
    });
};

exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

    Participant.findAll({ where: condition })
    .then(data => {
        console.log(data);
        res.send(data);
    })
    .catch(err => {
        console.log(err);
        res.status(500).send({
            message:
            err.message || "Error occured while retrieving participants." 
        });
    });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Participant.findByPk(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "Error ocuured while retrieving participant with id= " + id
        });
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Participant.destroy({
        where: { id: id }
    })
    .then (num => {
        if (num == 1) {
            res.send({
                message: "Participant was deleted successfully."
            });
        } else {
            res.send({
                message: `Cannot delete Participant with id id=${id}.`
            });
        }
    })

    .catch(err => {
        res.status(500).send({
            message: `Cannot delete Participant with id=${id}.`
        });
    });
};

exports.deleteAll = (req, res) => {
    Participant.destroy({
        where: {},
        truncate: false
    })
    .then (nums => {
        res.send({ message: `${nums} Participants were deleted successfully.`});
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Error occured while removing all participants."
        });
    });
};

