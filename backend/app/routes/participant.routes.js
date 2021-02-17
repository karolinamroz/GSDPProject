module.exports = app => {
    const participants = require("../controllers/participant.controller.js");

    var router = require("express").Router();

    //create a new participants
    router.post("/", participants.create);

    //find all participants
    router.get("/", participants.findAll);

    //find a participant
    router.get("/:id", participants.findOne);

    //delete a participant
    router.delete("/:id", participants.delete);

    //delete all participants
    router.delete("/", participants.deleteAll);

    router.put("/:id", participants.update);

    app.use('/api/participants', router);

};