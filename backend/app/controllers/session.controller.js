const db = require("../models");
const Session = db.sessions;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {
    if(!req.body.subject) {
            res.status(400).send({
                message: "Content cannot be empty!"
            });
            return;
        }
    const session = {
        subject: req.body.subject,
        department: req.body.department,
        type: req.body.type,
        start: req.body.type,
        finish: req.body.finish,
        venue: req.body.venue,
        published: req.body.published ? req.body.published : false
    };

    Session.create(session)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Error occured while creating the session."
        });
    });
};

exports.findAll = (req, res) => {
    const subject = req.query.subject;
    var condition = subject ? { subject: { [Op.like]: `%${subject}%` } } : null;

    Session.findAll({ where: condition })
    .then(data => {
        console.log(data);
        res.send(data);
    })
    .catch(err => {
        console.log(err);
        res.status(500).send({
            message:
            err.message || "Error occured while retrieving sessions." 
        });
    });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Session.findByPk(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "Error ocuured while retrieving session with id= " + id
        });
    });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Session.update(req.body, {
        where: { id: id }
    })

    .then(num => {
        if (num == 1) {
            res.send({
                message: "Session was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update session with id=${id}.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: `Error updating session with id="` + id
        });
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Session.destroy({
        where: { id: id }
    })
    .then (num => {
        if (num == 1) {
            res.send({
                message: "Session was deleted successfully."
            });
        } else {
            res.send({
                message: `Cannot delete Session with id id=${id}.`
            });
        }
    })

    .catch(err => {
        res.status(500).send({
            message: `Cannot delete Session with id=${id}.`
        });
    });
};

exports.deleteAll = (req, res) => {
    Session.destroy({
        where: {},
        truncate: false
    })
    .then (nums => {
        res.send({ message: `${nums} Sessions were deleted successfully.`});
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Error occured while removing all sessions."
        });
    });
};

exports.findAllPublished = (req, res) => {
    Session.findAll({ where: { published: true } })
    .then (data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Error occured while retrieving sessions."
        });
    });
};