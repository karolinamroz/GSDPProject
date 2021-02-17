const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

const db = require("./app/models");
//const Role = db.role;
//const { role } = require("./app/models");
//const { INITIALLY_DEFERRED } = require("sequelize/types/lib/deferrable");
db.sequelize.sync();

/*
db.sequelize.sync({force: true}).then(() => {
    console.log('Drop and Resync Db');
    initial();
});

function initial() {
    Role.create({
        id: 1,
        name: "user"
    });

    Role.create({
        id: 2,
        name: "moderator"
    });

    Role.create({
        id: 3,
        name: "admin"
    });
}
*/
//request parsing

app.use(bodyParser.json());

//request of content-type-application

app.use(bodyParser.urlencoded({ extended: true }));

//route

app.get("/", (req, res) => {
    res.json({ message: "Welcome to Karolina's application"});
});

require("./app/routes/session.routes")(app);
require("./app/routes/participant.routes")(app);
require('./app/routes/auth.routes')(app);
//require('./app/routes/user.routes')(app);

//set port, listen for request 

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});