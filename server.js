var mongoose = require("mongoose");
var express = require("express");
var router = express.Router();
var msa_team_controller = require("./controllers/msaTeamController");
var msa_user_controller = require("./controllers/msaUserController");
var MsaTeam = require("./models/msaTeam");
var bodyParser = require("body-parser");
//var routes = require("./routes");
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use("/msa")
// mongoose.connect(config.database, {
//   useMongoClient: true
// });
var msaMongoDb = "mongodb://localhost:27017/msa";
var port = process.env.PORT || 8080; // used to create, sign, and verify tokens
var db = mongoose.connection;
mongoose.connect(msaMongoDb, {
  useMongoClient: true
});
db.on("error", console.error.bind(console, "MongoDB connection error:"));
//msa user
app.post("/createUser", msa_user_controller.createUser);
app.delete("/deleteUser", msa_user_controller.deleteUser);
app.put("/editUser", msa_user_controller.editUser);
app.get("/viewUsers", msa_user_controller.viewUsers);
app.get("/viewUser/:_id", msa_user_controller.viewUser);

// msa team
app.post("/createTeam", msa_team_controller.createTeam);
app.delete("/deleteTeam", msa_team_controller.deleteTeam);
app.put("/editTeam", msa_team_controller.editTeam);
app.get("/viewTeams", msa_team_controller.viewTeams);
//put variable routes last
app.get("/viewTeam/:_id", msa_team_controller.viewTeam); //sending info via header

app.listen(port);
