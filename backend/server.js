const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

const db = require("./app/models");
db.sequelize.sync();

//request parsing

app.use(bodyParser.json());

//request of content-type-application

app.use(bodyParser.urlencoded({ extended: true }));

//route

app.get("/", (req, res) => {
    res.json({ message: "Welcome to Karolina's application"});
});

require("./app/routes/session.routes")(app);

//set port, listen for request 

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});