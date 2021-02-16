module.exports = app => {
    const sessions = require("../controllers/session.controller.js");

    var router = require("express").Router();

    //create a new session
    router.post("/", sessions.create);

    //find all sessions
    router.get("/", sessions.findAll);

    //find all published sessions
    router.get("/published", sessions.findAllPublished);

    //find a single session
    router.get("/:id", sessions.findOne);

    //modify a session
    router.put("/:id", sessions.update);

    //delete a session
    router.delete("/:id", sessions.delete);

    //delete all sessions 
    router.delete("/", sessions.deleteAll);

    router.post("/",sessions.addParticipant);

    app.use('/api/sessions', router);

};